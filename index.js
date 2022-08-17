
//Doi tuong Validatora


function Validator(options) {
    var selectorRules= {}
    //hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        var errorMessage;
        //lap qua rules de xuat loi
        var rules= selectorRules[rule.selector]
        for(var i=0;i<rules.length;i++) {
            errorMessage= rules[i](inputElement.value)
            if(errorMessage){
                break;
            }
        }


        if(errorMessage) {

            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');  
        }else{
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');  
    
        }
    }

    var formElement = document.querySelector(options.form)

    if(formElement) {

        var submitBtn = document.querySelector('.form-submit')
        submitBtn.onclick = function(){
        options.rules.forEach(function(rule) {

            var inputElement= formElement.querySelector(rule.selector)
            validate(inputElement,rule)
        })
        
        
    }
        options.rules.forEach(function(rule) {

             // luu cac rules lai vao selectorRules
             if(Array.isArray(selectorRules[rule.selector])) {
                 selectorRules[rule.selector].push(rule.test) ;
                 
                }else {
                    selectorRules[rule.selector] = [rule.test];
                }
                var inputElement= formElement.querySelector(rule.selector)
                if(inputElement) {
                    inputElement.onblur = function() {
                        validate(inputElement,rule)
                    }
                    inputElement.oninput = function() {
                        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                        errorElement.innerText = '';
                        inputElement.parentElement.classList.remove('invalid'); 
                    }
                }
            })
        console.log(selectorRules)
    }
    
    
}
Validator.isRequired= function(selector, message) {
    return {
        selector,
        test: function(value) {
            return value ? undefined : message|| 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail= function(selector, message) {
    return {
        selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            return regex ? undefined : message|| 'Trường này phải là email'
        }
    }
}

Validator.isRequiredPassworld= function(selector, min, message) {
    return {
        selector,
        test: function(value) {
            return value.length >=min ? undefined : message||`Vui lòng nhập tối thiểu ${min} kí tự`
        }
    }
}

Validator.isConfirmed= function(selector, getConfirmValue, message) {
    
    return {
        selector,
        test: function(value) {
            return value===getConfirmValue() ? undefined : message||'Giá trị nhập vào không đúng'
         }

    }
}