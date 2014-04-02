'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('pizzaApp.services', []).
    value('version', '0.1').
    // Services for pouchDB
    factory('pouchDb', [function () {
        var myDb = new PouchDB("ng-pouch");
        PouchDB.replicate('ng-pouch', 'http://127.0.0.1:5984/ng-db', {continuous: true, credentials: false});
        PouchDB.replicate('http://127.0.0.1:5984/ng-db', 'ng-pouch', {continuous: true, credentials: false});
        return myDb;
    }]).
    factory('pouchWrapper', ['$q', '$rootScope', 'pouchDb',
        function ($q, $rootScope, pouchDb) {
            return {
                add: function (doc) {
                    var deferred = $q.defer();
                    if (!doc.type) {
                        console.log("Document must define a type");
                        return;
                    }
                    pouchDb.post(doc, function (err, res) {
                        $rootScope.$apply(function () {
                            if (err) {
                                deferred.reject(err)
                            } else {
                                deferred.resolve(res)
                            }
                        });
                    });
                    return deferred.promise;
                },
                remove: function (id) {
                    var deferred = $q.defer();
                    pouchDb.get(id, function (err, doc) {
                        $rootScope.$apply(function () {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                pouchDb.remove(doc, function (err, res) {
                                    $rootScope.$apply(function () {
                                        if (err) {
                                            deferred.reject(err)
                                        } else {
                                            deferred.resolve(res)
                                        }
                                    });
                                });
                            }
                        });
                    });
                    return deferred.promise;
                }
            }
        }])
    .factory('cartListener', ['$rootScope', 'pouchDb', function ($rootScope, pouchDb) {
        pouchDb.changes({
            continuous: true,
            onChange: function (change) {
                if (!change.deleted) {
                    $rootScope.$apply(function () {
                        pouchDb.get(change.id, function (err, doc) {
                            $rootScope.$apply(function () {
                                if (err) console.log(err);
                                $rootScope.$broadcast('addOrder', doc);
                            })
                        });
                    })
                } else {
                    $rootScope.$apply(function () {
                        $rootScope.$broadcast('removeOrder', change.id);
                    })
                }
            }
        })
    }])
    .factory('pizzaListener', ['$rootScope', 'pouchDb', function ($rootScope, pouchDb) {
        pouchDb.changes({
            continuous: true,
            onChange: function (change) {
                if (!change.deleted) {
                    $rootScope.$apply(function () {
                        pouchDb.get(change.id, function (err, doc) {
                            $rootScope.$apply(function () {
                                if (err) console.log(err);
                                $rootScope.$broadcast('newPizza', doc);
                            })
                        })
                    })
                } else {
                    $rootScope.$apply(function () {
                        $rootScope.$broadcast('delPizza', change.id)
                    })
                }
            }
        })
    }])
    .value('kinds', [
        "",
        "ham",
        "beef",
        "chicken",
        "vegetarian",
        "other"
    ])
    .factory('Pizza', function () {
        return {
            create: function (name, kind, image, info, price) {
                return {
                    type: 'pizza',
                    name: name,
                    kind: kind,
                    image: image,
                    info: info,
                    price: Number(price)
                }
            }
        }
    })
    .factory('Cart', function () {
        return {
            create: function (items, total) {
                return {
                    items: items,
                    total: total
                }
            },
            init: function () {
                return {
                    items: [],
                    total: 0
                }
            }
        }
    })
    .factory('OrderItem', function () {
        return {
            create: function (productId, name, price, qty) {
                return {
                    productId: productId,
                    name: name,
                    price: price,
                    qty: (qty ? qty : 1)
                }
            }
        }
    });