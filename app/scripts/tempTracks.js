angular.module('cfFront')
    .directive('tempTracks', function(mergesService){
        function link(scope, iElement, attrs, compile){
            var merges;
            var mergeFields = ['work_title', 'album_art_path'];

            iElement.datagrid({
                title: 'Edit Tracks',
                toolbar: '#toolbar',
                iconCls: 'icon-edit',
                singleSelect: false,
                checkOnSelect: false,
                autoRowHeight: true,
                //fitColumns: true,
                url: 'http://classicalforce.app:8000/get_temp_track',
                method: 'get',
                saveUrl: 'save_user.php',
                //updateUrl: 'http://10.0.10.10/temp_track_update',
                destroyUrl: 'destroy_user.php',
                columns:[[
                    {field:'check',checkbox:"true"},
                    {field:'id',title:'Track ID',width:50,hidden:"true"},
                    {field:'album_art_path',title:'Cover Art',
                        formatter: function(value,row,index){
                            if (value != undefined && value != null){
                                return '<img src="' + value +'">';
                            } else {
                                return '';
                            }
                        }
                    },
                    {field:'work_title',title:'Work Title',editor:'text',sortable:"true"},
                    {field:'track_title',title:'Track Title',editor:'text',sortable:"true"},
                    {field:'album_title',title:'Album Title',editor:'text',sortable:"true",hidden:"true"},

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
                onClickCell: function(index, field, value){
                    if (mergeFields.indexOf(field) >= 0){
                        var isSelected = $('tr[datagrid-row-index="' + index + '"]').first().hasClass('datagrid-row-selected');

                        if (!isSelected){
                            selectMerges(merges, index, field, iElement);
                        } else {
                            unselectMerges(merges, index, field, iElement);
                        }
                    }
                },
                onLoadSuccess: function(data){
                    //iElement.datagrid('collapseGroup', 0);
                    merges = mergesService.getMerges(data, mergeFields);

                    $('.datagrid-group-title').bind('click', function(){
                        alert($(this).text());
                    });

                    applyMerges(merges, iElement);

                    iElement.datagrid('expandGroup', 1);
                    //scope.$digest();
                }
            });
        }

        return {
            replace: true,
            transclude: false,
            compile: function (element, attrs) {

                return link;
            },
            controller: function($scope, $element){
               $('.modal').hide();

            }
        };
    });

var applyMerges = function(merges, element){
    if (merges !== undefined) {

        //loops through each set of merges for each field to be merged
        for (var j=0; j<merges.length; j++){

            for (var i=0; i<merges[j].merges.length; i++){
                element.datagrid('mergeCells',{
                    index: merges[j].merges[i].index,
                    field: merges[j].field,
                    rowspan: merges[j].merges[i].rowspan
                });
            }
        }
    }
};

var getFieldMergeSpan = function(merges, index, field){
    //selects the merges for the passed in field
    var fieldMerges = merges.filter(function(element){
        return element.field == field;
    });

    //selects the merge with passed in index
    var fieldMergeSpan = fieldMerges[0].merges.filter(function(element){
        return element.index == index;
    });

    return (fieldMergeSpan[0] !== undefined) ? fieldMergeSpan[0].rowspan : 0
};

var selectMerges = function(merges, index, field, iElement){
    var mergeSpan = getFieldMergeSpan(merges, index, field);
    console.log(mergeSpan);

    //selects all rows within the merge
    for (var i = 1; i<mergeSpan; i++){
        iElement.datagrid('selectRow', i+index);
    }
};

var unselectMerges = function(merges, index, field, iElement){
    var mergeSpan = getFieldMergeSpan(merges, index, field);

    //unselects all rows within the merge
    for (var i = 1; i<mergeSpan; i++){
        iElement.datagrid('unselectRow', i+index);
    }
};
