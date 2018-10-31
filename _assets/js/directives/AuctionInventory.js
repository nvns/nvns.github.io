/*
 * NVNS Auction Inventory directive
 * This uses a JSON description of the auction inventory and
 * renders the data in a tabular format.
 * @author cyap
 */

(function() {
    'use strict';

    nvns.nvnsApp.directive('nvnsAuctionInventory', nvnsAuctionInventory);

    nvnsAuctionInventory.$inject = [];

    function nvnsAuctionInventory() {
        return {
            restrict: 'E',
            templateUrl: '/dist/html/auction_inventory/auction_inventory_table.html',
            scope: {

            },
            controller: nvnsAuctionInventoryController
        };
    }

    nvnsAuctionInventoryController.$inject = ['$scope'];

    function nvnsAuctionInventoryController($scope) {
        var sv = $scope.vars = {
            inventory: [
                {
                    title: 'Live Auction',
                    type: 'auction',
                    items: [
                        {title: 'TWO-NIGHT STAY IN SANTA CRUZ BEACH HOUSE',
                        value: 1200.00,
                        starting_bid: 700.00},

                        {title: 'TWO-NIGHT STAY IN GUERNEVILLE FAMILY COMPOUND - UP TO TEN PEOPLE',
                        value: 1000.00,
                        starting_bid: 700.00},

                        {title: 'MARINE MAMMAL CENTER BEHIND THE SCENES TOUR',
                        value: 1000.00,
                        starting_bid: 450.00},

                        {title: 'THREE-NIGHT STAY ANTIQUE CAPE COD LAKE HOUSE - UP TO SIX ADULTS',
                        value: 975.00,
                        starting_bid: 600.00},

                        {title: 'TWO-NIGHT STAY FOR TWO AT LODGE AT EDGEWOOD TAHOE',
                        value: 900.00,
                        starting_bid: 600.00},

                        {title: '4 TICKETS TO SF GIANTS',
                        value: 700.00,
                        starting_bid: 450.00},

                        {title: 'CUSTOM OIL PORTRAIT OF YOUR CHILD BY KEES DEN BREEJEN',
                        value: 500.00,
                        starting_bid: 300.00},

                        {title: 'CRAWFISH BOIL OR JAMBALAYA FOR 10-20 PEOPLE',
                        value: 450.00,
                        starting_bid: 300.00},

                        {title: 'HAREL\'S BREADMAKING CLASS FOR 5 PEOPLE',
                        value: 250.00,
                        starting_bid: 150.00},

                        {title: 'STUBBS FAMILY VINEYARD WINE TOUR AND TASTING',
                        value: 280.00,
                        starting_bid: 150.00},

                        {title: 'SF JAZZ CENTER VOUCHER FOR TWO PERFORMANCE TICKETS',
                        value: 130.00,
                        starting_bid: 85.00},

                        {title: 'GOLDEN GATE BRIDGE SAILBOAT/MIMOSA TOUR FOR TWO',
                        value: 130.00,
                        starting_bid: 70.00},

                        {title: 'LIBERATED LIGHT HERBALS TEA/SALVE BASKET',
                        value: null,
                        starting_bid: null}

                    ]
                },
                {
                    title: 'Silent Auction',
                    type: 'auction',
                    items: [
                        {
                          title: 'TWO-NIGHT STAY FOR TWO AT OMNI ROYAL ORLEANS',
                          value: 850,
                          starting_bid: 650
                        },
                        {
                          title: 'ONE-HOUR PHOTOGRAPHY SESSION WITH FAMILY PHOTOGRAPHER LILA SMYTH',
                          value: 550,
                          starting_bid: 350
                        },
                        {
                          title: 'ORGANIC VALLEY YEARS SUPPLY OF ORGANIC DAIRY PRODUCTS',
                          value: 520,
                          starting_bid: 275
                        },
                        {
                          title: 'ART + WINE PAINT NIGHT - PRIVATE PAINTING LESSON FOR UP TO FIVE PEOPLE FROM JEN BLOOMER',
                          value: 450,
                          starting_bid: 200
                        },
                        {
                          title: 'BRISKET DINNER FOR UP TO 15 PEOPLE',
                          value: 450,
                          starting_bid: 350
                        },
                        {
                          title: 'LUNCH FOR TWO WITH CA STATE SENATOR SCOTT WIENER',
                          value: 350,
                          starting_bid: 175
                        },
                        {
                          title: 'ONE-NIGHT STAY FOR TWO AT BOON HOTEL & SPA',
                          value: 318,
                          starting_bid: 150
                        },
                        {
                          title: 'ONE-NIGHT STAY AND ROUND OF GOLF FOR TWO AT HISTORIC BENBOW HOTEL AND RESORT',
                          value: 315,
                          starting_bid: 250
                        },
                        {
                          title: 'TWO-NIGHT STAY IN LOVELY IN-LAW RENTAL IN  SF\'S GLEN PARK',
                          value: 300,
                          starting_bid: 150
                        },
                        {
                          title: 'BETABRAND SHOPPING EXPERIENCE',
                          value: 300,
                          starting_bid: 100
                        },
                        {
                          title: 'ONE-NIGHT STAY FOR TWO AT SORENSON\'S RESORT IN HOPE VALLEY',
                          value: 275,
                          starting_bid: 150
                        },
                        {
                          title: 'CUSTOM OUTDOOR WOODEN PLAY KITCHEN',
                          value: 250,
                          starting_bid: 100
                        },
                        {
                          title: 'ORIGINAL CUSTOM ILLUSTRATION SHIRI ASHKENAZI',
                          value: 250,
                          starting_bid: 180
                        },
                        {
                          title: 'BARBARY COAST TOURS HISTORIC WALKING TOUR',
                          value: 200,
                          starting_bid: 75
                        },
                        {
                          title: 'SF ZOO TRIP WITH TEACHER EVA AND TEACHER JOHANA',
                          value: 200,
                          starting_bid: 160
                        },
                        {
                          title: 'SOULCYCLE - 3 CLASS PASS',
                          value: 96,
                          starting_bid: 55
                        },
                        {
                          title: 'BAY SAIL FOR 2 - ADVENTURE CAT SAILING CHARTERS',
                          value: 90,
                          starting_bid: 50
                        },
                        {
                          title: 'PRESIDIO BOWL - ONE HOUR OF UNLIMITED BOWLING ON ONE LANE',
                          value: 89,
                          starting_bid: 45
                        },
                        {
                          title: 'TERRA MIA POTTERY PAINTING VIP STUDIO PASS',
                          value: 60,
                          starting_bid: 45
                        }
                    ]
                },
                {
                    title: 'Raffles',
                    type: 'raffle',
                    items: [
                        {
                            title: 'INSTANT WINE CELLAR RAFFLE - WIN UP TO 15 BOTTLES OF WINE (EACH BOTTLE WORTH AT LEAST $35)',
                            price: 30
                        },
                        {
                            title: 'TWO-NIGHT STAY AT SF\'S HOTEL KABUKI - VALUED AT $550',
                            price: 50
                        }
                    ]
                },
                {
                    title: 'Restaurant Row',
                    type: 'restaurant_row',
                    items: [
                        {
                            title: 'GIFT CERTIFCATES TO SOME OF SF\'S MOST POPULAR RESTAURANTS',
                        }
                    ]
                }
            ]
        }
    }
})();
