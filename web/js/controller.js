var missingArray;
var duplicateHeader;
var singleValue;
var sameColumn;
var duplicateRowsCount;
var incompleteRowsCount;


function getPathToFile() {
    eel.pythonFunction()(
        r => setValue(r)
    );
};

function setValue(path) {
    $("#file_path").val(path);
    $("#filePath").val(path);
}

function startAnalyze() {
    $("#loadingPage1").removeAttr("hidden");
    $("#csvForm").fadeTo("slow", 0);
    var csv_path = $("#file_path").val();
    // console.log(csv_path);
    eel.startAnalyze(csv_path)(
        r => processData(r)
    );
}

function processData(response) {
    $("#csvForm").attr("hidden", true);
    var gR1 = '<tr><td scope="row">';
    var gRIndex = 0;
    var gR2 = '</td><td class="text-left">';
    var gRKey = "";
    var gR3 = '</td><td>';
    var gRVal = "";
    var gR4 = '</td></tr>';

    const objectArray = Object.entries(response);

    objectArray.every(([key, value]) => {
        gRIndex = gRIndex + 1;
        gRKey = key;
        gRVal = value;
        $("#generalReport").append(gR1 + gRIndex + gR2 + gRKey + gR3 + gRVal + gR4);
        if (gRIndex == 10) {
            return false;
        } else {
            return true;
        }
    })

    // objectArray.forEach(([key, value]) => {
    //     datamap = response['dataMap'];
    //     console.log(datamap);
    // })

    datamap = response['dataMap'];
    // console.log(datamap);
    rowHeight = 1;

    // if (datamap.length > 1000){
    //     rowHeight = 1000/(datamap.length);
    // }

    // console.log(rowHeight);

    for (var row = 0; row < datamap.length; row++) {
        markup = '<tr height="' + rowHeight + '">';
        for (var column = 0; column < datamap[row].length; column++) {
            if (datamap[row][column] == 1) {
                markup += '<td style="background: #000099;"></td>';
            } else {
                markup += '<td style="background: #FFFF00;"></td>';
            }
        }
        markup += '</tr>';
        $("#dataMap").append(markup);
    }

    duplicateMap = response['duplicateHeadMap'];
    markup = '<tr height="20">';
    for (var column = 0; column < duplicateMap.length; column++) {
        if (duplicateMap[column] == 1) {
            markup += '<td style="background: #00B0F0;"></td>';
        } else {
            markup += '<td style="background: #FFFFFF;"></td>';
        }
    }
    markup += '</tr>';
    $("#duplicate").append(markup);

    missingMapping = response['missingMapping'];
    markup = '<tr height="20">';
    for (var column = 0; column < missingMapping.length; column++) {
        if (missingMapping[column] <= 10) {
            markup += '<td style="background: #02FD1E;">';
        } else if (missingMapping[column] <= 20) {
            markup += '<td style="background: #40F61D;">';
        } else if (missingMapping[column] <= 30) {
            markup += '<td style="background: #69EA1B;">';
        } else if (missingMapping[column] <= 40) {
            markup += '<td style="background: #8CDA18;">';
        } else if (missingMapping[column] <= 50) {
            markup += '<td style="background: #ACC415;">';
        } else if (missingMapping[column] <= 60) {
            markup += '<td style="background: #C6AA11;">';
        } else if (missingMapping[column] <= 70) {
            markup += '<td style="background: #DA8C0C;">';
        } else if (missingMapping[column] <= 80) {
            markup += '<td style="background: #EB6908;">';
        } else if (missingMapping[column] <= 90) {
            markup += '<td style="background: #F74104;">';
        } else {
            markup += '<td style="background: #FD1702;">';
        }
        // markup += missingMapping[column] + '%</td>';
        markup += '</td>';
    }
    markup += '</tr>';
    $("#missRate").append(markup);

    duplicateHeaderArray = response['duplicateHeaderArray'];
    duplicateHeader = duplicateHeaderArray;

    for (var item = 0; item < duplicateHeaderArray.length; item++) {
        // if (item == 0) {
        //     markup = '<tr><td class="text-center" rowspan="' + duplicateHeaderArray.length + '">Duplicate Headers</td>';
        //     markup += '<td class="text-center">' + duplicateHeaderArray[item] + '</td><td class="text-center">';
        //     markup += '<div class="radio"><input type="radio" name="DUPLICATE' + duplicateHeaderArray[item] + item + '" value="' + duplicateHeaderArray[item] + 'KEEP"></div></td>';
        //     markup += '<td class="text-center"><div class="radio"><input type="radio" name="DUPLICATE' + duplicateHeaderArray[item] + item + '" checked value="' + duplicateHeaderArray[item] + 'REMOVE"></div></td></tr>';
        //     $("#userAction").append(markup);
        // } else {
            markup = '<tr><td class="text-center">Duplicate Headers</td>';
            markup += '<td class="text-center">' + duplicateHeaderArray[item] + '</td><td class="text-center">';
            markup += '<div class="radio"><input type="radio" name="DUPLICATE' + item + '" value="' + duplicateHeaderArray[item] + 'KEEP" checked></div></td>';
            markup += '<td class="text-center"><div class="radio"><input type="radio" name="DUPLICATE' + item + '" value="' + duplicateHeaderArray[item] + 'REMOVE"></div></td></tr>';
            $("#userAction").append(markup);
        // }
    }

    // markup = '<tr><td colspan="4"></td></tr>';
    // $("#userAction").append(markup);

    singleValueColumnArray = response['singleValueColumnArray'];
    singleValue = singleValueColumnArray;

    for (var item = 0; item < singleValueColumnArray.length; item++) {
        // if (item == 0) {
        //     markup = '<tr><td class="text-center" rowspan="' + singleValueColumnArray.length + '">Single Value Column</td>';
        //     markup += '<td class="text-center">' + singleValueColumnArray[item] + '</td><td class="text-center">';
        //     markup += '<div class="radio"><input type="radio" name="SINGLE' + singleValueColumnArray[item] + item + '" value="' + singleValueColumnArray[item] + 'KEEP"></div></td>';
        //     markup += '<td class="text-center"><div class="radio"><input type="radio" name="SINGLE' + singleValueColumnArray[item] + item + '" checked value="' + singleValueColumnArray[item] + 'REMOVE"></div></td></tr>';
        //     $("#userAction").append(markup);
        // } else {
            markup = '<tr><td class="text-center">Single Value Column</td>';
            markup += '<td class="text-center">' + singleValueColumnArray[item] + '</td><td class="text-center">';
            markup += '<div class="radio"><input type="radio" name="SINGLE' + singleValueColumnArray[item] + item + '" value="' + singleValueColumnArray[item] + 'KEEP" checked></div></td>';
            markup += '<td class="text-center"><div class="radio"><input type="radio" name="SINGLE' + singleValueColumnArray[item] + item + '" value="' + singleValueColumnArray[item] + 'REMOVE"></div></td></tr>';
            $("#userAction").append(markup);
        // }
    }

    // markup = '<tr><td colspan="4"></td></tr>';
    // $("#userAction").append(markup);

    anyValueMissingColumnArray = response['anyValueMissingColumnArray'];
    missingArray = anyValueMissingColumnArray;

    for (var item = 0; item < anyValueMissingColumnArray.length; item++) {
        var res = anyValueMissingColumnArray[item].split(",");
        // if (item == 0) {
        //     markup = '<tr><td class="text-center" rowspan="' + anyValueMissingColumnArray.length + '">Missing Data</td>';
        //     markup += '<td class="text-center">' + res[0] + ' (' + res[1] + '%)</td><td class="text-center">';
        //     markup += '<div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" value="' + res[0] + 'KEEP"></div></td>';
        //     markup += '<td class="text-center"><div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" checked value="' + res[0] + 'REMOVE"></div></td></tr>';
        //     $("#userAction").append(markup);
        // } else {
            markup = '<tr><td class="text-center">Missing Data</td>';
            markup += '<td class="text-center">' + res[0] + ' (' + res[1] + '%)</td><td class="text-center">';
            markup += '<div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" value="' + res[0] + 'KEEP" checked></div></td>';
            markup += '<td class="text-center"><div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" value="' + res[0] + 'REMOVE"></div></td></tr>';
            $("#userAction").append(markup);
        // }
    }

    // markup = '<tr><td colspan="4"></td></tr>';
    // $("#userAction").append(markup);

    columnsHavingSameValueArray = response['columnsHavingSameValueArray'];
    sameColumn = columnsHavingSameValueArray;

    for (var item = 0; item < columnsHavingSameValueArray.length; item++) {
        // if (item == 0) {
        //     markup = '<tr><td class="text-center" rowspan="' + columnsHavingSameValueArray.length + '">Columns with Same Value</td>';
        //     markup += '<td class="text-center">' + columnsHavingSameValueArray[item] + '</td><td class="text-center">';
        //     markup += '<div class="radio"><input type="radio" name="SAME' + columnsHavingSameValueArray[item] + item + '" value="' + columnsHavingSameValueArray[item] + 'KEEP"></div></td>';
        //     markup += '<td class="text-center"><div class="radio"><input type="radio" name="SAME' + columnsHavingSameValueArray[item] + item + '" checked value="' + columnsHavingSameValueArray[item] + 'REMOVE"></div></td></tr>';
        //     $("#userAction").append(markup);
        // } else {
            markup = '<tr><td class="text-center">Columns with Same Value</td>';
            markup += '<td class="text-center">' + columnsHavingSameValueArray[item] + '</td><td class="text-center">';
            markup += '<div class="radio"><input type="radio" name="SAME' + columnsHavingSameValueArray[item] + item + '" value="' + columnsHavingSameValueArray[item] + 'KEEP" checked></div></td>';
            markup += '<td class="text-center"><div class="radio"><input type="radio" name="SAME' + columnsHavingSameValueArray[item] + item + '" value="' + columnsHavingSameValueArray[item] + 'REMOVE"></div></td></tr>';
            $("#userAction").append(markup);
        // }
    }

    // markup = '<tr><td colspan="4"></td></tr>';
    // $("#userAction").append(markup);

    duplicateRowsCount = response['Duplicate Rows'];
    incompleteRowsCount = response['Incomplete Rows'];

    markup = '<tr><td class="text-center">Duplicate Rows</td>';
    markup += '<td class="text-center">' + response['Duplicate Rows'] + '</td><td class="text-center">';
    markup += '<div class="radio"><input type="radio" name="DR" value="DR_KEEP" checked></div></td>';
    markup += '<td class="text-center"><div class="radio"><input type="radio" name="DR" value="DR_REMOVE"></div></td></tr>';
    $("#userAction").append(markup);

    markup = '<tr><td class="text-center">Incomplete Rows</td>';
    markup += '<td class="text-center">' + response['Incomplete Rows'] + '</td><td class="text-center">';
    markup += '<div class="radio"><input type="radio" name="IR" value="IR_KEEP" checked></div></td>';
    markup += '<td class="text-center"><div class="radio"><input type="radio" name="IR" value="IR_REMOVE"></div></td></tr>';
    $("#userAction").append(markup);

    // <tr>
    //     <td class="text-center" rowspan="4">Quality Issue</td>
    //     <td class="text-center">Title</td>
    //     <td class="text-center">
    //         <div class="radio">
    //             <input type="radio" name="optradio1">
    // 									</div>
    // 								</td>
    //         <td class="text-center">
    //             <div class="radio">
    //                 <input type="radio" name="optradio1" checked>
    // 									</div>
    // 								</td>
    // 							</tr>
    //         <tr>
    //             <td class="text-center">Title</td>
    //             <td class="text-center">
    //                 <div class="radio">
    //                     <input type="radio" name="optradio2">
    // 									</div>
    // 								</td>
    //                 <td class="text-center">
    //                     <div class="radio">
    //                         <input type="radio" name="optradio2" checked>
    // 									</div>
    // 								</td>
    // 							</tr>

    $("#report").removeAttr("hidden");
    $("#loadingPage1").fadeTo("slow", 0);
    $("#loadingPage1").attr("hidden", true);
    
    setTimeout(function () {
        $('#userActions').DataTable({
            paging: true
        });
    }, 1000);
}

function regenrateMissing(){
    $('#userActions').DataTable().clear().destroy();
    $("#loadingPage1").removeAttr("hidden");
    $("#report").attr("hidden", true);
    $("#userAction").html("");

    missingVal = $("#missingVal").val();

    // for (var item = 0; item < missingArray.length; item++) {
    //     var res = missingArray[item].split(",");
    //     if (res[1] > missingVal){
    //         $('input[name=MISSING' + res[0] + item + '][value=' + res[0] + 'REMOVE]').prop("checked", true);
    //     }
    //         // markup = '<tr><td class="text-center">Missing Data</td>';
    //         // markup += '<td class="text-center">' + res[0] + ' (' + res[1] + '%)</td><td class="text-center">';
    //         // markup += '<div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" value="' + res[0] + 'KEEP"></div></td>';
    //         // markup += '<td class="text-center"><div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" checked value="' + res[0] + 'REMOVE"></div></td></tr>';
    // }


    duplicateHeaderArray = duplicateHeader;

    for (var item = 0; item < duplicateHeaderArray.length; item++) {
        // if (item == 0) {
        //     markup = '<tr><td class="text-center" rowspan="' + duplicateHeaderArray.length + '">Duplicate Headers</td>';
        //     markup += '<td class="text-center">' + duplicateHeaderArray[item] + '</td><td class="text-center">';
        //     markup += '<div class="radio"><input type="radio" name="DUPLICATE' + duplicateHeaderArray[item] + item + '" value="' + duplicateHeaderArray[item] + 'KEEP"></div></td>';
        //     markup += '<td class="text-center"><div class="radio"><input type="radio" name="DUPLICATE' + duplicateHeaderArray[item] + item + '" checked value="' + duplicateHeaderArray[item] + 'REMOVE"></div></td></tr>';
        //     $("#userAction").append(markup);
        // } else {
            markup = '<tr><td class="text-center">Duplicate Headers</td>';
            markup += '<td class="text-center">' + duplicateHeaderArray[item] + '</td><td class="text-center">';
            markup += '<div class="radio"><input type="radio" name="DUPLICATE' + item + '" value="' + duplicateHeaderArray[item] + 'KEEP" checked></div></td>';
            markup += '<td class="text-center"><div class="radio"><input type="radio" name="DUPLICATE' + item + '" value="' + duplicateHeaderArray[item] + 'REMOVE"></div></td></tr>';
            $("#userAction").append(markup);
        // }
    }

    // markup = '<tr><td colspan="4"></td></tr>';
    // $("#userAction").append(markup);

    singleValueColumnArray = singleValue;

    for (var item = 0; item < singleValueColumnArray.length; item++) {
        // if (item == 0) {
        //     markup = '<tr><td class="text-center" rowspan="' + singleValueColumnArray.length + '">Single Value Column</td>';
        //     markup += '<td class="text-center">' + singleValueColumnArray[item] + '</td><td class="text-center">';
        //     markup += '<div class="radio"><input type="radio" name="SINGLE' + singleValueColumnArray[item] + item + '" value="' + singleValueColumnArray[item] + 'KEEP"></div></td>';
        //     markup += '<td class="text-center"><div class="radio"><input type="radio" name="SINGLE' + singleValueColumnArray[item] + item + '" checked value="' + singleValueColumnArray[item] + 'REMOVE"></div></td></tr>';
        //     $("#userAction").append(markup);
        // } else {
            markup = '<tr><td class="text-center">Single Value Column</td>';
            markup += '<td class="text-center">' + singleValueColumnArray[item] + '</td><td class="text-center">';
            markup += '<div class="radio"><input type="radio" name="SINGLE' + singleValueColumnArray[item] + item + '" value="' + singleValueColumnArray[item] + 'KEEP" checked></div></td>';
            markup += '<td class="text-center"><div class="radio"><input type="radio" name="SINGLE' + singleValueColumnArray[item] + item + '" value="' + singleValueColumnArray[item] + 'REMOVE"></div></td></tr>';
            $("#userAction").append(markup);
        // }
    }

    // markup = '<tr><td colspan="4"></td></tr>';
    // $("#userAction").append(markup);

    anyValueMissingColumnArray = missingArray;

    for (var item = 0; item < anyValueMissingColumnArray.length; item++) {
        var res = anyValueMissingColumnArray[item].split(",");
        // if (item == 0) {
        //     markup = '<tr><td class="text-center" rowspan="' + anyValueMissingColumnArray.length + '">Missing Data</td>';
        //     markup += '<td class="text-center">' + res[0] + ' (' + res[1] + '%)</td><td class="text-center">';
        //     markup += '<div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" value="' + res[0] + 'KEEP"></div></td>';
        //     markup += '<td class="text-center"><div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" checked value="' + res[0] + 'REMOVE"></div></td></tr>';
        //     $("#userAction").append(markup);
        // } else {
            if(parseFloat(res[1]) > parseFloat(missingVal)){
                markup = '<tr><td class="text-center">Missing Data</td>';
                markup += '<td class="text-center">' + res[0] + ' (' + res[1] + '%)</td><td class="text-center">';
                markup += '<div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" value="' + res[0] + 'KEEP"></div></td>';
                markup += '<td class="text-center"><div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" value="' + res[0] + 'REMOVE" checked></div></td></tr>';
            } else {
                markup = '<tr><td class="text-center">Missing Data</td>';
                markup += '<td class="text-center">' + res[0] + ' (' + res[1] + '%)</td><td class="text-center">';
                markup += '<div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" value="' + res[0] + 'KEEP" checked></div></td>';
                markup += '<td class="text-center"><div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" value="' + res[0] + 'REMOVE"></div></td></tr>';
            }
            $("#userAction").append(markup);
        // }
    }

    // markup = '<tr><td colspan="4"></td></tr>';
    // $("#userAction").append(markup);

    columnsHavingSameValueArray = sameColumn;

    for (var item = 0; item < columnsHavingSameValueArray.length; item++) {
        // if (item == 0) {
        //     markup = '<tr><td class="text-center" rowspan="' + columnsHavingSameValueArray.length + '">Columns with Same Value</td>';
        //     markup += '<td class="text-center">' + columnsHavingSameValueArray[item] + '</td><td class="text-center">';
        //     markup += '<div class="radio"><input type="radio" name="SAME' + columnsHavingSameValueArray[item] + item + '" value="' + columnsHavingSameValueArray[item] + 'KEEP"></div></td>';
        //     markup += '<td class="text-center"><div class="radio"><input type="radio" name="SAME' + columnsHavingSameValueArray[item] + item + '" checked value="' + columnsHavingSameValueArray[item] + 'REMOVE"></div></td></tr>';
        //     $("#userAction").append(markup);
        // } else {
            markup = '<tr><td class="text-center">Columns with Same Value</td>';
            markup += '<td class="text-center">' + columnsHavingSameValueArray[item] + '</td><td class="text-center">';
            markup += '<div class="radio"><input type="radio" name="SAME' + columnsHavingSameValueArray[item] + item + '" value="' + columnsHavingSameValueArray[item] + 'KEEP" checked></div></td>';
            markup += '<td class="text-center"><div class="radio"><input type="radio" name="SAME' + columnsHavingSameValueArray[item] + item + '" value="' + columnsHavingSameValueArray[item] + 'REMOVE"></div></td></tr>';
            $("#userAction").append(markup);
        // }
    }

    // markup = '<tr><td colspan="4"></td></tr>';
    // $("#userAction").append(markup);

    markup = '<tr><td class="text-center">Duplicate Rows</td>';
    markup += '<td class="text-center">' + duplicateRowsCount + '</td><td class="text-center">';
    markup += '<div class="radio"><input type="radio" name="DR" value="DR_KEEP" checked></div></td>';
    markup += '<td class="text-center"><div class="radio"><input type="radio" name="DR" value="DR_REMOVE"></div></td></tr>';
    $("#userAction").append(markup);

    markup = '<tr><td class="text-center">Incomplete Rows</td>';
    markup += '<td class="text-center">' + incompleteRowsCount + '</td><td class="text-center">';
    markup += '<div class="radio"><input type="radio" name="IR" value="IR_KEEP" checked></div></td>';
    markup += '<td class="text-center"><div class="radio"><input type="radio" name="IR" value="IR_REMOVE"></div></td></tr>';
    $("#userAction").append(markup);

    $("#report").removeAttr("hidden");
    $("#loadingPage1").fadeTo("slow", 0);
    $("#loadingPage1").attr("hidden", true);

    setTimeout(function () {
        $('#userActions').DataTable({
            paging: true
        });
    }, 1000);
}

function keepAll(){
    $('#userActions').DataTable().clear().destroy();
    $("#loadingPage1").removeAttr("hidden");
    $("#report").attr("hidden", true);
    $("#userAction").html("");

    duplicateHeaderArray = duplicateHeader;

    for (var item = 0; item < duplicateHeaderArray.length; item++) {
        // if (item == 0) {
        //     markup = '<tr><td class="text-center" rowspan="' + duplicateHeaderArray.length + '">Duplicate Headers</td>';
        //     markup += '<td class="text-center">' + duplicateHeaderArray[item] + '</td><td class="text-center">';
        //     markup += '<div class="radio"><input type="radio" name="DUPLICATE' + duplicateHeaderArray[item] + item + '" value="' + duplicateHeaderArray[item] + 'KEEP"></div></td>';
        //     markup += '<td class="text-center"><div class="radio"><input type="radio" name="DUPLICATE' + duplicateHeaderArray[item] + item + '" checked value="' + duplicateHeaderArray[item] + 'REMOVE"></div></td></tr>';
        //     $("#userAction").append(markup);
        // } else {
            markup = '<tr><td class="text-center">Duplicate Headers</td>';
            markup += '<td class="text-center">' + duplicateHeaderArray[item] + '</td><td class="text-center">';
            markup += '<div class="radio"><input type="radio" name="DUPLICATE' + item + '" value="' + duplicateHeaderArray[item] + 'KEEP" checked></div></td>';
            markup += '<td class="text-center"><div class="radio"><input type="radio" name="DUPLICATE' + item + '" value="' + duplicateHeaderArray[item] + 'REMOVE"></div></td></tr>';
            $("#userAction").append(markup);
        // }
    }

    // markup = '<tr><td colspan="4"></td></tr>';
    // $("#userAction").append(markup);

    singleValueColumnArray = singleValue;

    for (var item = 0; item < singleValueColumnArray.length; item++) {
        // if (item == 0) {
        //     markup = '<tr><td class="text-center" rowspan="' + singleValueColumnArray.length + '">Single Value Column</td>';
        //     markup += '<td class="text-center">' + singleValueColumnArray[item] + '</td><td class="text-center">';
        //     markup += '<div class="radio"><input type="radio" name="SINGLE' + singleValueColumnArray[item] + item + '" value="' + singleValueColumnArray[item] + 'KEEP"></div></td>';
        //     markup += '<td class="text-center"><div class="radio"><input type="radio" name="SINGLE' + singleValueColumnArray[item] + item + '" checked value="' + singleValueColumnArray[item] + 'REMOVE"></div></td></tr>';
        //     $("#userAction").append(markup);
        // } else {
            markup = '<tr><td class="text-center">Single Value Column</td>';
            markup += '<td class="text-center">' + singleValueColumnArray[item] + '</td><td class="text-center">';
            markup += '<div class="radio"><input type="radio" name="SINGLE' + singleValueColumnArray[item] + item + '" value="' + singleValueColumnArray[item] + 'KEEP" checked></div></td>';
            markup += '<td class="text-center"><div class="radio"><input type="radio" name="SINGLE' + singleValueColumnArray[item] + item + '" value="' + singleValueColumnArray[item] + 'REMOVE"></div></td></tr>';
            $("#userAction").append(markup);
        // }
    }

    // markup = '<tr><td colspan="4"></td></tr>';
    // $("#userAction").append(markup);

    anyValueMissingColumnArray = missingArray;

    for (var item = 0; item < anyValueMissingColumnArray.length; item++) {
        var res = anyValueMissingColumnArray[item].split(",");
        // if (item == 0) {
        //     markup = '<tr><td class="text-center" rowspan="' + anyValueMissingColumnArray.length + '">Missing Data</td>';
        //     markup += '<td class="text-center">' + res[0] + ' (' + res[1] + '%)</td><td class="text-center">';
        //     markup += '<div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" value="' + res[0] + 'KEEP"></div></td>';
        //     markup += '<td class="text-center"><div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" checked value="' + res[0] + 'REMOVE"></div></td></tr>';
        //     $("#userAction").append(markup);
        // } else {
            markup = '<tr><td class="text-center">Missing Data</td>';
            markup += '<td class="text-center">' + res[0] + ' (' + res[1] + '%)</td><td class="text-center">';
            markup += '<div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" value="' + res[0] + 'KEEP" checked></div></td>';
            markup += '<td class="text-center"><div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" value="' + res[0] + 'REMOVE"></div></td></tr>';
            $("#userAction").append(markup);
        // }
    }

    // markup = '<tr><td colspan="4"></td></tr>';
    // $("#userAction").append(markup);

    columnsHavingSameValueArray = sameColumn;

    for (var item = 0; item < columnsHavingSameValueArray.length; item++) {
        // if (item == 0) {
        //     markup = '<tr><td class="text-center" rowspan="' + columnsHavingSameValueArray.length + '">Columns with Same Value</td>';
        //     markup += '<td class="text-center">' + columnsHavingSameValueArray[item] + '</td><td class="text-center">';
        //     markup += '<div class="radio"><input type="radio" name="SAME' + columnsHavingSameValueArray[item] + item + '" value="' + columnsHavingSameValueArray[item] + 'KEEP"></div></td>';
        //     markup += '<td class="text-center"><div class="radio"><input type="radio" name="SAME' + columnsHavingSameValueArray[item] + item + '" checked value="' + columnsHavingSameValueArray[item] + 'REMOVE"></div></td></tr>';
        //     $("#userAction").append(markup);
        // } else {
            markup = '<tr><td class="text-center">Columns with Same Value</td>';
            markup += '<td class="text-center">' + columnsHavingSameValueArray[item] + '</td><td class="text-center">';
            markup += '<div class="radio"><input type="radio" name="SAME' + columnsHavingSameValueArray[item] + item + '" value="' + columnsHavingSameValueArray[item] + 'KEEP" checked></div></td>';
            markup += '<td class="text-center"><div class="radio"><input type="radio" name="SAME' + columnsHavingSameValueArray[item] + item + '" value="' + columnsHavingSameValueArray[item] + 'REMOVE"></div></td></tr>';
            $("#userAction").append(markup);
        // }
    }

    // markup = '<tr><td colspan="4"></td></tr>';
    // $("#userAction").append(markup);

    markup = '<tr><td class="text-center">Duplicate Rows</td>';
    markup += '<td class="text-center">' + duplicateRowsCount + '</td><td class="text-center">';
    markup += '<div class="radio"><input type="radio" name="DR" value="DR_KEEP" checked></div></td>';
    markup += '<td class="text-center"><div class="radio"><input type="radio" name="DR" value="DR_REMOVE"></div></td></tr>';
    $("#userAction").append(markup);

    markup = '<tr><td class="text-center">Incomplete Rows</td>';
    markup += '<td class="text-center">' + incompleteRowsCount + '</td><td class="text-center">';
    markup += '<div class="radio"><input type="radio" name="IR" value="IR_KEEP" checked></div></td>';
    markup += '<td class="text-center"><div class="radio"><input type="radio" name="IR" value="IR_REMOVE"></div></td></tr>';
    $("#userAction").append(markup);

    $("#report").removeAttr("hidden");
    $("#loadingPage1").fadeTo("slow", 0);
    $("#loadingPage1").attr("hidden", true);

    setTimeout(function () {
        $('#userActions').DataTable({
            paging: true
        });
    }, 1000);
}

function removeAll(){
    $('#userActions').DataTable().clear().destroy();
    $("#loadingPage1").removeAttr("hidden");
    $("#report").attr("hidden", true);
    $("#userAction").html("");

    duplicateHeaderArray = duplicateHeader;

    for (var item = 0; item < duplicateHeaderArray.length; item++) {
        // if (item == 0) {
        //     markup = '<tr><td class="text-center" rowspan="' + duplicateHeaderArray.length + '">Duplicate Headers</td>';
        //     markup += '<td class="text-center">' + duplicateHeaderArray[item] + '</td><td class="text-center">';
        //     markup += '<div class="radio"><input type="radio" name="DUPLICATE' + duplicateHeaderArray[item] + item + '" value="' + duplicateHeaderArray[item] + 'KEEP"></div></td>';
        //     markup += '<td class="text-center"><div class="radio"><input type="radio" name="DUPLICATE' + duplicateHeaderArray[item] + item + '" checked value="' + duplicateHeaderArray[item] + 'REMOVE"></div></td></tr>';
        //     $("#userAction").append(markup);
        // } else {
            markup = '<tr><td class="text-center">Duplicate Headers</td>';
            markup += '<td class="text-center">' + duplicateHeaderArray[item] + '</td><td class="text-center">';
            markup += '<div class="radio"><input type="radio" name="DUPLICATE' + item + '" value="' + duplicateHeaderArray[item] + 'KEEP"></div></td>';
            markup += '<td class="text-center"><div class="radio"><input type="radio" name="DUPLICATE' + item + '" value="' + duplicateHeaderArray[item] + 'REMOVE" checked></div></td></tr>';
            $("#userAction").append(markup);
        // }
    }

    // markup = '<tr><td colspan="4"></td></tr>';
    // $("#userAction").append(markup);

    singleValueColumnArray = singleValue;

    for (var item = 0; item < singleValueColumnArray.length; item++) {
        // if (item == 0) {
        //     markup = '<tr><td class="text-center" rowspan="' + singleValueColumnArray.length + '">Single Value Column</td>';
        //     markup += '<td class="text-center">' + singleValueColumnArray[item] + '</td><td class="text-center">';
        //     markup += '<div class="radio"><input type="radio" name="SINGLE' + singleValueColumnArray[item] + item + '" value="' + singleValueColumnArray[item] + 'KEEP"></div></td>';
        //     markup += '<td class="text-center"><div class="radio"><input type="radio" name="SINGLE' + singleValueColumnArray[item] + item + '" checked value="' + singleValueColumnArray[item] + 'REMOVE"></div></td></tr>';
        //     $("#userAction").append(markup);
        // } else {
            markup = '<tr><td class="text-center">Single Value Column</td>';
            markup += '<td class="text-center">' + singleValueColumnArray[item] + '</td><td class="text-center">';
            markup += '<div class="radio"><input type="radio" name="SINGLE' + singleValueColumnArray[item] + item + '" value="' + singleValueColumnArray[item] + 'KEEP"></div></td>';
            markup += '<td class="text-center"><div class="radio"><input type="radio" name="SINGLE' + singleValueColumnArray[item] + item + '" value="' + singleValueColumnArray[item] + 'REMOVE" checked></div></td></tr>';
            $("#userAction").append(markup);
        // }
    }

    // markup = '<tr><td colspan="4"></td></tr>';
    // $("#userAction").append(markup);

    anyValueMissingColumnArray = missingArray;

    for (var item = 0; item < anyValueMissingColumnArray.length; item++) {
        var res = anyValueMissingColumnArray[item].split(",");
        // if (item == 0) {
        //     markup = '<tr><td class="text-center" rowspan="' + anyValueMissingColumnArray.length + '">Missing Data</td>';
        //     markup += '<td class="text-center">' + res[0] + ' (' + res[1] + '%)</td><td class="text-center">';
        //     markup += '<div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" value="' + res[0] + 'KEEP"></div></td>';
        //     markup += '<td class="text-center"><div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" checked value="' + res[0] + 'REMOVE"></div></td></tr>';
        //     $("#userAction").append(markup);
        // } else {
            markup = '<tr><td class="text-center">Missing Data</td>';
            markup += '<td class="text-center">' + res[0] + ' (' + res[1] + '%)</td><td class="text-center">';
            markup += '<div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" value="' + res[0] + 'KEEP"></div></td>';
            markup += '<td class="text-center"><div class="radio"><input type="radio" name="MISSING' + res[0] + item + '" value="' + res[0] + 'REMOVE" checked></div></td></tr>';
            $("#userAction").append(markup);
        // }
    }

    // markup = '<tr><td colspan="4"></td></tr>';
    // $("#userAction").append(markup);

    columnsHavingSameValueArray = sameColumn;

    for (var item = 0; item < columnsHavingSameValueArray.length; item++) {
        // if (item == 0) {
        //     markup = '<tr><td class="text-center" rowspan="' + columnsHavingSameValueArray.length + '">Columns with Same Value</td>';
        //     markup += '<td class="text-center">' + columnsHavingSameValueArray[item] + '</td><td class="text-center">';
        //     markup += '<div class="radio"><input type="radio" name="SAME' + columnsHavingSameValueArray[item] + item + '" value="' + columnsHavingSameValueArray[item] + 'KEEP"></div></td>';
        //     markup += '<td class="text-center"><div class="radio"><input type="radio" name="SAME' + columnsHavingSameValueArray[item] + item + '" checked value="' + columnsHavingSameValueArray[item] + 'REMOVE"></div></td></tr>';
        //     $("#userAction").append(markup);
        // } else {
            markup = '<tr><td class="text-center">Columns with Same Value</td>';
            markup += '<td class="text-center">' + columnsHavingSameValueArray[item] + '</td><td class="text-center">';
            markup += '<div class="radio"><input type="radio" name="SAME' + columnsHavingSameValueArray[item] + item + '" value="' + columnsHavingSameValueArray[item] + 'KEEP"></div></td>';
            markup += '<td class="text-center"><div class="radio"><input type="radio" name="SAME' + columnsHavingSameValueArray[item] + item + '" value="' + columnsHavingSameValueArray[item] + 'REMOVE" checked></div></td></tr>';
            $("#userAction").append(markup);
        // }
    }

    // markup = '<tr><td colspan="4"></td></tr>';
    // $("#userAction").append(markup);

    markup = '<tr><td class="text-center">Duplicate Rows</td>';
    markup += '<td class="text-center">' + duplicateRowsCount + '</td><td class="text-center">';
    markup += '<div class="radio"><input type="radio" name="DR" value="DR_KEEP"></div></td>';
    markup += '<td class="text-center"><div class="radio"><input type="radio" name="DR" value="DR_REMOVE" checked></div></td></tr>';
    $("#userAction").append(markup);

    markup = '<tr><td class="text-center">Incomplete Rows</td>';
    markup += '<td class="text-center">' + incompleteRowsCount + '</td><td class="text-center">';
    markup += '<div class="radio"><input type="radio" name="IR" value="IR_KEEP"></div></td>';
    markup += '<td class="text-center"><div class="radio"><input type="radio" name="IR" value="IR_REMOVE" checked></div></td></tr>';
    $("#userAction").append(markup);

    $("#report").removeAttr("hidden");
    $("#loadingPage1").fadeTo("slow", 0);
    $("#loadingPage1").attr("hidden", true);

    setTimeout(function () {
        $('#userActions').DataTable({
            paging: true
        });
    }, 1000);
}

function formSerialization() {
    $("#loadingPage1").removeAttr("hidden");
    $("#loadingPage1").fadeTo("slow", 100);
    $("#report").attr("hidden", true);
    eel.startCleansing($("#actionForm").serialize())(
        r => fileSaved(r)
    );
}

function fileSaved(response){
    $("#loadingPage1").fadeTo("slow", 0);
    $("#fileName").html(response);
    $("#loadingPage1").attr("hidden", true);
    $("#donePage").removeAttr("hidden");
}