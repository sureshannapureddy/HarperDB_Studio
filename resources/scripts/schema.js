var schemaForSearch = [];
$(document).ready(function () {
    createAddTableType();
    createuploadFileType();
    var schemaName = document.getElementById('selectSchemaName').value;
    console.log(schemaName);
    getTable(schemaName);
    $("#addType").change(function () {
        var type = document.getElementById('addType').value;
        if (type == 'table')
            createAddTableType();
        else
            createAddSchemaType();
    })

    $('#addCSVBtn').click(() => {
        $('#addCSVBtn').attr('disabled', true)
    })

    $("#csvType").change(function () {
        var type = document.getElementById('csvType').value;

        if (type == 'file')
            createuploadFileType();
        else if (type == 'url')
            createUrlCSVType()
        else
            createDataCSVType();
    });

    $("#selectSchemaName").change(function () {
        var schemaName = document.getElementById('selectSchemaName').value;
        getTable(schemaName);
    });

    $('[id]').each(function () {
        var ids = $('[id="' + this.id + '"]');
        if (ids.length > 1 && ids[0] == this)
            console.warn('Multiple IDs #' + this.id);
    });

    var schemas = document.getElementById('schemas').value;
    schemas = JSON.parse(schemas);
    schemaForSearch = Object.keys(schemas);

    $('#searchSchema').keyup(function () {
        var valueSearch = $('#searchSchema').val();
        console.log(valueSearch);
        if (valueSearch == ''){
            console.log('all');
            schemaForSearch.forEach(element => {
                $('#' + element).show();
            });
        }
        else {
            schemaForSearch.forEach(element => {
                $('#' + element).hide();
            });
            let results = [];
            valueSearch = valueSearch.toLowerCase();
            results = schemaForSearch.filter(x => x.toLowerCase().includes(valueSearch));
            results.forEach(element => {
                $('#' + element).show();
            });
        }
    });

});

getTable = (schemaName) => {
    var schemas = document.getElementById('schemas').value;
    schemas = JSON.parse(schemas);
    $("#selectTableName").children().remove();
    if (schemas[schemaName] != undefined) {
        var tableNames = Object.keys(schemas[schemaName]);
        tableNames.forEach(element => {
            $("#selectTableName").append(('<option value="' + element + '"> ' + element + '</option>'));
        });
    }
}

createAddTableType = () => {
    var schemas = document.getElementById('schemas').value;
    var appendChangeType = document.getElementById('changeAddType');

    appendChangeType.innerHTML = '';
    schemas = JSON.parse(schemas);
    var schemaNames = [];
    for (var prop in schemas) {
        schemaNames.push(prop);
    }

    var btnDiv = document.createElement('div')
    btnDiv.setAttribute('class', 'btn-group clear mr-2')
    btnDiv.setAttribute('style', 'float:left')

    var span = document.createElement('span')
    span.setAttribute('class', 'minwidth150 mr-2')
    span.append('Select Schema')

    var select = document.createElement('select');
    select.setAttribute('class', 'minwidth250')
    select.setAttribute('name', 'schemaName')
    select.setAttribute('id', 'schemaName')
    select.setAttribute('required', true)

    schemaNames.forEach(element => {
        var options = document.createElement('option');
        options.setAttribute('value', element)
        options.append(element)
        select.append(options);
    });

    btnDiv.append(span);
    btnDiv.append(select);
    appendChangeType.append(btnDiv);

    btnDiv = document.createElement('div')
    btnDiv.setAttribute('class', 'btn-group clear mt-2')
    btnDiv.setAttribute('style', 'float:left')

    var input = document.createElement('input');
    input.setAttribute('class', 'minwidth250')
    input.setAttribute('name', 'tableName')
    input.setAttribute('id', 'tableName')
    input.setAttribute('required', true)

    span = document.createElement('span')
    span.setAttribute('class', 'minwidth150 mr-2')
    span.append('Table Name')

    btnDiv.append(span)
    btnDiv.append(input)

    appendChangeType.append(btnDiv);

    btnDiv = document.createElement('div')
    btnDiv.setAttribute('class', 'btn-group clear mt-2')
    btnDiv.setAttribute('style', 'float:left')

    var input = document.createElement('input');
    input.setAttribute('class', 'minwidth250')
    input.setAttribute('name', 'hashAttribute')
    input.setAttribute('id', 'hashAttribute')
    input.setAttribute('required', true)

    span = document.createElement('span')
    span.setAttribute('class', 'minwidth150 mr-2')
    span.append('Hash Attribute')

    btnDiv.append(span)
    btnDiv.append(input)
    appendChangeType.append(btnDiv);
    $("div #exampleModalLongTitle").text("Add Table");
}

createAddSchemaType = () => {
    var appendChangeType = document.getElementById('changeAddType');
    exampleModalLongTitle
    appendChangeType.innerHTML = '';
    var btnDiv = document.createElement('div')

    btnDiv.setAttribute('class', 'btn-group')
    btnDiv.setAttribute('style', 'float:left')

    var span = document.createElement('span')
    span.setAttribute('class', 'minwidth150 mr-2')
    span.append('Schema Name')

    var input = document.createElement('input');
    input.setAttribute('class', 'minwidth250')
    input.setAttribute('name', 'schemaName')
    input.setAttribute('id', 'schemaName')
    input.setAttribute('required', true)

    btnDiv.append(span);
    btnDiv.append(input);
    appendChangeType.append(btnDiv);
    $("div #exampleModalLongTitle").text("Add Schema");
}

createuploadFileType = () => {

    var appendChangeType = document.getElementById('changeCSVType');

    appendChangeType.innerHTML = '';

    var btnDiv = document.createElement('div')
    btnDiv.setAttribute('class', 'btn-group clear mr-2')
    btnDiv.setAttribute('style', 'float:left')

    var span = document.createElement('span')
    span.setAttribute('class', 'minwidth150 mr-2')
    span.append('Path CSV File')


    var upload = document.createElement('input');
    upload.setAttribute('type', 'text');
    upload.setAttribute('name', 'csvPath')
    upload.setAttribute('id', 'uploadFileCsv')
    upload.setAttribute('class', 'minwidth250')
    btnDiv.append(span)
    btnDiv.append(upload)
    appendChangeType.append(btnDiv);
}

createUrlCSVType = () => {
    var appendChangeType = document.getElementById('changeCSVType');

    appendChangeType.innerHTML = '';

    var btnDiv = document.createElement('div')
    btnDiv.setAttribute('class', 'btn-group clear mr-2')
    btnDiv.setAttribute('style', 'float:left')

    var span = document.createElement('span')
    span.setAttribute('class', 'minwidth150 mr-2')
    span.append('CSV Url')


    var upload = document.createElement('input');
    upload.setAttribute('type', 'text');
    upload.setAttribute('name', 'csvUrl')
    upload.setAttribute('class', 'minwidth250')
    btnDiv.append(span)
    btnDiv.append(upload)
    appendChangeType.append(btnDiv);
}

createDataCSVType = () => {
    var appendChangeType = document.getElementById('changeCSVType');

    appendChangeType.innerHTML = '';

    var btnDiv = document.createElement('div')
    btnDiv.setAttribute('class', 'btn-group clear mr-2')
    btnDiv.setAttribute('style', 'float:left')

    var span = document.createElement('span')
    span.setAttribute('class', 'minwidth150 mr-2')
    span.append('CSV Data')


    var upload = document.createElement('textarea');
    upload.setAttribute('name', 'csvData')
    upload.setAttribute('class', 'minwidth250')
    btnDiv.append(span)
    btnDiv.append(upload)
    appendChangeType.append(btnDiv);
}