(function( $ ) {
    $.fn.simpleAutoComplete = function(options) {
        var self  = this,
            currentVal= "",
            currentInput= "",
            typingTimer,
            doneTypingInterval = 300,
            search_drop,
            settings = $.extend({
                source:"",
                highlight:true,
                minLength:3
            }, options );
        self.attr("autocomplete","off");
        self.on('keyup', function(e){
            currentInput = $(this);
            if(e.which ==  40 && currentInput.val().length > 0){
                self.focusItem("next");
            }else if(e.which==38){
                self.focusItem("prev");
            }else{
                clearTimeout(typingTimer);
                typingTimer = setTimeout(self.getResponse, doneTypingInterval);
            }
        });
        self.on('blur', function(e){
            search_drop.remove();
        });
        self._renderItem = function (ul, item) {
            var itemValue = item.value;
            if(settings.highlight){
                itemValue = String(item.value).replace(
                    new RegExp(currentVal, "gi"),
                    "<strong>$&</strong>");
            }
            return $("<li data-item='"+item.value+"'></li>")
                .append("<a href='#'>" + itemValue + "</a>")
                .appendTo(ul);
        };
        self.getResponse = function () {
            currentVal   = currentInput.val();
            if(currentVal.length >= settings.minLength){
                $.ajax({
                    type: "GET",
                    url: settings.source,
                    data:{term:currentVal},
                    dataType: "JSON",
                    success:function(response){
                        if(response.length > 0) {
                            if (currentInput.siblings("ul.simple-autocomplete").length == 0) {
                                search_drop = $("<ul class='simple-autocomplete'></ul>");
                                currentInput.after(search_drop);
                            }
                            search_drop = currentInput.siblings("ul.simple-autocomplete");
                            search_drop.html("");
                            for (var i in response) {
                                self._renderItem(search_drop, response[i]);
                            }
                            search_drop.find("li").on("click", self.selectItem);
                            search_drop.find("li a").on("click", self.preventDefaultLink);
                        }
                    },
                    error: function(response) {
                        console.log(response,"response");
                    }
                });

            }else{
                if(currentInput.siblings("ul.simple-autocomplete").length > 0){
                    currentInput.siblings("ul.simple-autocomplete").remove();
                }
            }
        };
        self.selectItem = function (e) {
            currentInput.val($(this).attr('data-item'));
            search_drop.remove();
        };
        self.focusItem= function (focusDirection) {
            var currentItemsList = currentInput.siblings("ul.simple-autocomplete");
            if(currentItemsList.children("li.focused").length == 0 && focusDirection == "next") {
                currentItemsList.children("li:first-child")
                                .addClass("focused");
            }else{
                var currentFocusedItem = currentItemsList.children("li.focused");
                currentFocusedItem.removeClass("focused");
                console.log(currentFocusedItem,"currentFocusedItem");
                if(focusDirection == "next"){
                    currentFocusedItem.next().addClass("focused");
                }else{
                    currentFocusedItem.prev().addClass("focused");
                }
            }
            if(currentItemsList.children("li.focused").length == 0){
                currentInput.val(currentVal);
            }else{
                currentInput.val(currentItemsList.children("li.focused").attr('data-item'));
            }
        };
        self.preventDefaultLink = function (e) {
            e.preventDefault();
        };
        return $(this);
    };
}( jQuery ));