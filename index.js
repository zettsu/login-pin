let current_index = 0;

document.getElementById("form-login").addEventListener('submit', function (evt) {
    evt.preventDefault();
    let first_step = document.getElementById("first-step");
    let second_step = document.getElementById("second-step");
    if(!first_step.classList.contains("hide")){
        document.getElementById("first-step").classList.add('hide');
    }
    if(second_step.classList.contains("hide")){
        document.getElementById("second-step").classList.remove('hide');
    }
})


document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function(evt){
        document.getElementById("password-"+current_index).value = this.value;
        if(!document.getElementById("password-"+current_index).classList.contains("orange")){
            document.getElementById("password-"+current_index).classList.add("orange");
        }
        current_index++;
    });
});

document.getElementById("")

function clear(){
    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("click", function(evt){
            document.getElementById("password-"+current_index).value = this.value;
        });
    });
}