(function () {
    $(function () {
        //basicExample();
        realWorldExample();


    });


    function basicExample() {
        var deferred = new $.Deferred();
        deferred.done(function (data) {
            console.log(data);
        });
        deferred.fail(function (data) {
            console.log('fail', data);
        });
        setTimeout(function () {
            //resolve it and pass the data
            deferred.resolve('some data');
            deferred.reject('some data');
        }, 3000);
        setTimeout(function () {
            console.log(deferred.state());
        }, 2000);
        setTimeout(function () {
            console.log(deferred.state());
        }, 4000);
    }

    function realWorldExample() {
        $.when(execution()).then(executionDone);

        function execution(data) {
            var dfd = $.Deferred();
            console.log('start execution');

            //in the real world, this would probably make an AJAX call.
            setTimeout(function () {
                dfd.resolve()
            }, 2000);

            return dfd.promise();
        }

        function executionDone() {
            console.log('execution ended');
        }
    }

}());
