angular.module('cfFront')
    .directive('tempTracks', function(){
        function link(scope, iElement, attrs, compile){


            //iElement.('datagrid-group-title').on('click', function(){
            //   alert('clicked');
            //});

            //alert('test');
            iElement.datagrid({
                title: 'Edit Tracks',
                toolbar: '#toolbar',
                iconCls: 'icon-edit',
                singleSelect: false,
                checkOnSelect: false,
                autoRowHeight: true,
                fitColumns: true,
                url: 'http://classicalforce.app:8000/get_temp_track',
                method: 'get',
                //multiSort: 'true',
                onLoadSuccess:function(){
                    var numRows = $(this).datagrid('getRows').length;
                    var data = $(this).datagrid('getData');

                },
                saveUrl: 'save_user.php',
                //updateUrl: 'http://10.0.10.10/temp_track_update',
                destroyUrl: 'destroy_user.php',
                columns:[[
                    {field:'check',checkbox:"true"},
                    {field:'md5_hash',title:'Cover Art',
                        formatter: function(value,row,index){
                            if (value != null){
                                return '<img src = /img/temp_albums/th-' + value + ".jpg><\/img>";
                            } else {
                                return value;
                            }
                        }
                    },
                    {field:'id',title:'Track ID',width:50,hidden:true},
                    {field:'track_title',title:'Track Title',editor:'text',sortable:"true"},
                    {field:'album_title',title:'Album Title',editor:'text',sortable:"true"},
                    {field:'work_title',title:'Work Title',editor:'text',sortable:"true"},
                    {field:'work_number',title:'Work Number',editor:'text'},
                    {field:'key',title:'Key',editor:'text'},
                    {field:'opus_number',title:'Opus Number',editor:'text'},
                    {field:'composer_first_name',title:'First Name',editor:'text',sortable:"true"},
                    {field:'composer_last_name',title:'Last Name',editor:'text',sortable:"true"}
                ]],
                idField: 'id',
                onEndEdit: function(rowIndex, rowData, changes) {
                    rowChanges = changes;

                },
                groupField: 'composer_last_name',
                view: groupview,
                groupFormatter: function(value, rows){
                    return value + ' - ' + rows.length + ' Track(s)';
                },
                onHeaderContextMenu: function(e, field){
                  alert('menu');
                },
                onRowContextMenu: function(e, index, row){

                },
                onLoadSuccess: function(data){
                    //$('.datagrid-group-title').attr('ng-click', 'click()');
                    //    compile($('.datagrid-group-title'))(scope);

                }

            });



            //scope.$digest();
            //console.log(iElement.find('#saveAll').text());

        }

        return {
            replace: true,
            transclude: false,
            compile: function (element, attrs) {

                return link;
            },
            controller: function($scope, $element, $compile, $timeout){
               //console.log($element.parent().find('.datagrid-group-title').text());
               ////alert($(document).find('.datagrid-group-title').text());
               // $('.datagrid-group-title').on('click', function(){
               //    alert('composer');
               // });

                $('.modal').hide();

                $scope.change = function(){
                    //$('.datagrid-group-title').replaceWith($('.datagrid-group-title'));
                    //$('.datagrid-group-title').attr('ng-click', 'click()');
                    //$compile($('.datagrid-group-title'))($scope);
                    $('.datagrid-group-title').attr('ng-click', 'click()');
                    $compile($('.datagrid-view .datagrid-group')[0][0][0][1])($scope);
                };

                $(document).on('click', '.datagrid-group-title', function(){
                    alert('test clicked');
                });

                $timeout(function(){
                    //alert('timeout');

                    //$('.datagrid-group-title').attr('ng-click', 'click()');
                    ////$('.datagrid-group-title').attr('data-toggle', 'modal');
                    ////$('.datagrid-group-title').attr('data-target', '#basicModal');
                    //$compile($('.easy-ui-datagrid .datagrid-group')[0])($scope);
                    //$scope.$apply();
                },3000);

                var click = function(){
                  alert('clicked');
                };
            }
        };
    });