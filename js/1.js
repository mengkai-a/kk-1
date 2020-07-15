$(function () {
    load()
    // 获取值
    function getDate() {
        var data = localStorage.getItem('todolist');
        if (data == null) {
            return [];
        } else {
            return JSON.parse(data);
        }
    }
    // 保存值
    function saveDate(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    }
    // 修改值
    function load() {
        $('ol, ul').empty();
        var arr = getDate();
        for (i = 0; i < arr.length; i++) {
            if (arr[i].done == true) {
                $('ul').prepend(`<li>
                                <input type="checkbox" checked>
                                <p>${arr[i].title}</p>
                                <a href="javascript:;" id = "${i}"></a>
                            </li>`)
            } else {
                $('ol').prepend(`<li>
                                <input type="checkbox">
                                <p>${arr[i].title}</p>
                                <a href="javascript:;" id = "${i}"></a>
                            </li>`)
            }
        }
        $('#todocount').text($('ol li').length);
        $('#donecount').text($('ul li').length);
    }
    $('ol, ul').on('click', 'a', function () {
        var arr = getDate();
        var index = $(this).prop('id');
        // console.log(index);
        arr.splice(index, 1);
        saveDate(arr)
        load()
    })
    $('#title').on('keydown', function (e) {
        if (e.keyCode === 13) {
            if ($(this).val() == "") {
                alert('请输入...')
            } else {
                var local = getDate();
                local.push({ title: $(this).val(), done: false });
                saveDate(local)
                load()
                $(this).val('')
            }
        }
    })
    $('ol, ul').on('click', 'input', function () {
        var arr = getDate();
        var index = $(this).siblings('a').attr('id');
        arr[index].done = $(this).prop('checked');
        saveDate(arr)
        load()
        //哈哈哈哈哈哈哈哈哈哈
    })
})