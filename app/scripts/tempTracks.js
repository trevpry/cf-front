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
                //onLoadSuccess:function(){
                //    alert('success');
                //    var numRows = $(this).datagrid('getRows').length;
                //    var data = $(this).datagrid('getData');
                //    compile($('.easy-ui-datagrid .datagrid-group')[0])(scope);
                //    scope.$apply();
                //
                //
                //},
                saveUrl: 'save_user.php',
                //updateUrl: 'http://10.0.10.10/temp_track_update',
                destroyUrl: 'destroy_user.php',
                columns:[[
                    {field:'check',checkbox:"true"},
                    {field:'id',title:'Track ID',width:50,hidden:"true"},
                    {field:'album_art_path',title:'Cover Art',
                        formatter: function(value,row,index){
                        //    if (value != null){
                                //return '<img src="' + value +'">';
                        //    } else {
                        //        return value;
                        //    }
                        }
                    },
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
                    var merges = [];

                    //$('.datagrid-group-title').attr('ng-click', 'click()');
                    $('.datagrid-group-title').bind('click', function(){
                        alert($(this).text());
                    });
                    //scope.$apply();
                    console.log($('.datagrid-group-title'));
                    //console.log(data);
                    //compile($('.easy-ui-datagrid .datagrid-group')[0])(scope);



                    //for (var i=0; i<merges.length; i++){
                    //    iElement.datagrid('mergeCells',{
                    //        index: merges[i].index,
                    //        field: 'album_art_path',
                    //        rowspan: merges[i].rowspan
                    //    });
                    //}

                }

            });

            iElement.children().bind('mouseenter', function(){
                iElement.children().css('background-color', 'pink');
                scope.$apply();
            });

            //scope.$digest();
            //console.log($('.datagrid-group-title'));

        }

        return {
            replace: true,
            transclude: false,
            scope: {clickCallback: "&"},
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
                    //$('.datagrid-group-title').attr('ng-click', 'click()');
                    //$compile($('.datagrid-view .datagrid-group')[0])($scope);
                    alert('change');
                    $scope.$apply();
                };

                $(document).on('click', '.datagrid-group-title', function(){
                    alert('test clicked');
                    $scope.$apply();
                });

                $timeout(function(){
                    //alert('timeout');

                    //$('.datagrid-group-title').attr('ng-click', 'click()');
                    ////$('.datagrid-group-title').attr('data-toggle', 'modal');
                    ////$('.datagrid-group-title').attr('data-target', '#basicModal');
                    //$compile($('.easy-ui-datagrid .datagrid-group')[0])($scope);
                    //$scope.$apply();
                },3000);

                $scope.click = function(){
                  alert('clicked');
                };

                $element.click(function(){
                    $scope.clickCallback();
                    $scope.$apply();
                })
            }
        };
    });