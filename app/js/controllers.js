'use strict';

/* Controllers */

angular.module('pizzaApp.controllers', [])
    .controller('ViewCtrl', ['$scope', '$rootScope', 'pizzaListener', 'cartListener',
        'pouchWrapper', 'kinds', 'OrderItem', 'Cart',
        function ($scope, $rootScope, pizzaListener, cartListener, pouchWrapper, kinds, OrderItem, Cart) {
            $rootScope.activeTab = 'pizzas';

            if (!$rootScope.pizzas) {
                $rootScope.pizzas = [];
            }

            if (!$rootScope.cart) {
                $rootScope.cart = Cart.init();
            }

            $scope.kinds = kinds;
            $scope.kind = kinds[0];

            $scope.$on('newPizza', function (event, pizza) {
                $rootScope.pizzas.unshift(pizza);
            });

            $scope.add = function (entry) {

                var entry = OrderItem.create(
                    entry._id,
                    entry.name,
                    entry.price
                );

                var firstOne = false;
                for (var i = 0; i < $rootScope.cart.items.length; i++) {
                    if ($rootScope.cart.items[i].productId == entry.productId) {
                        $rootScope.cart.items[i].qty++;
                        $rootScope.cart.items[i].price += entry.price;
                        $rootScope.cart.total += entry.price;
                        firstOne = true;
                        return;
                    }
                }

                if (!firstOne) {
                    $rootScope.cart.items.push(entry);
                    $rootScope.cart.total += $rootScope.cart.items[i].price;
                }
            };

            $scope.remove = function (item) {
                var i = $rootScope.cart.items.indexOf(item);
                if (item.qty > 1) {
                    var price = item.price/item.qty
                    $rootScope.cart.items[i].price -= price;
                    $rootScope.cart.items[i].qty--;
                    $rootScope.cart.total -= price;
                } else {
                    $rootScope.cart.items.splice(i, 1);
                    $rootScope.cart.total -= item.price;
                }

            }
        }
    ])
    .controller('AddCtrl', ['$scope', '$rootScope', 'pizzaListener', 'pouchWrapper', 'kinds', 'Pizza',
        function ($scope, $rootScope, listener, pouchWrapper, kinds, Pizza) {
            $rootScope.activeTab = 'add-pizza';
            if (!$rootScope.pizzas) {
                $rootScope.pizzas = [];
            }
            $scope.pizza = {};

            $scope.kinds = kinds;
            $scope.pizza.kind = kinds[0];

            $scope.submit = function () {
                var item = Pizza.create(
                    $scope.pizza.name,
                    $scope.pizza.kind,
                    $scope.pizza.image,
                    $scope.pizza.info,
                    $scope.pizza.price
                );

                pouchWrapper.add(item).then(function (success) {
                    resetForm();
                    $scope.submited = {
                        msg: 'Pizza added ',
                        type: 'success'
                    };
                    console.log(success);
                }, function (fail) {
                    $scope.submited = {
                        msg: 'Sorry, Couldn\'t add pizza',
                        type: 'error'
                    };
                    console.log(fail);
                });
            };

            $scope.remove = function (id) {
                pouchWrapper.remove(id).then(function (success) {
                    console.log(success);
                }, function (fail) {
                    console.log(fail);
                });
            };

            $scope.$on('newPizza', function (event, pizza) {
                $rootScope.pizzas.unshift(pizza);
            });

            $scope.$on('delPizza', function (event, id) {
                for (var i in $rootScope.pizzas) {
                    if ($rootScope.pizzas[i]._id === id) {
                        $rootScope.pizzas.splice(i, 1);
                    }
                }
            });

            function resetForm() {
                $scope.pizza = {};
                $scope.pizza.kind = $scope.kinds[0];
                $scope.pizzaForm.$setPristine(true);
            }
        }
    ]);