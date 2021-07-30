// Calender Section
let monthOlympic = [31,29,31,30,31,30,31,31,30,31,30,31];
let monthNormal = [31,28,31,30,31,30,31,31,30,31,30,31];
let monthName = ["January","Febrary","March","April","May","June","July","August","September","October","November","December"];
let monthNumber = [1,2,3,4,5,6,7,8,9,10,11,12];
let date = document.getElementById("date");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let month = document.getElementById("month");
let year = document.getElementById("year");

let nowDate = new Date();
let nowYear = nowDate.getFullYear();
let nowMonth = nowDate.getMonth();
let nowDay = nowDate.getDate();

// calender-算每月第一天在第幾天
function dayStart(month, year) {
	let tmpDate = new Date(year, month, 1);
	return (tmpDate.getDay());
}

// calender-算該月有幾天
function daysMonth(month, year) {
	let tmp = year % 4;
	if (tmp == 0) {
		return (monthOlympic[month]);
	} else {
		return (monthNormal[month]);
	}
}


// calender-為一個月的每一天配置效果
function refreshDate() {
    let str = "";
    let totalDay = daysMonth(nowMonth, nowYear);
    let firstDay = dayStart(nowMonth, nowYear);
    // console.log(totalDay);
    for(var i = 1; i < firstDay; i++) {
        str += "<li></li>";
    }

    for(var i = 1; i <= totalDay; i++) {
        if ( (i < nowDay && nowYear == nowDate.getFullYear() && nowMonth == nowDate.getMonth()) || nowYear < nowDate.getFullYear() || (nowYear == nowDate.getFullYear() && nowMonth < nowDate.getMonth()) ) {
            var myClass = " class='lightgrey'";
        } 
        else if ( i == nowDay && nowYear == nowDate.getFullYear() && nowMonth == nowDate.getMonth() ) { 
            var myClass = " class='green'"
        }
        else {
			var myClass = " class='darkgrey'"; 
		}
        str += "<li" + myClass + ">" + i + "</li>"; 
    }
    date.innerHTML = str;
    month.innerHTML = monthName[nowMonth];
    year.innerHTML = nowYear;
}

// First run
refreshDate();

// Calender - Prev Button
prev.addEventListener("click", e => {
    e.preventDefault();
	nowMonth--;
	if(nowMonth < 0){
		nowYear--;
		nowMonth = 11;
	}
	refreshDate();
    markDateWhenCheck();
})

// Calender - Next Button
next.addEventListener("click", e => {
	e.preventDefault();
	nowMonth++;
	if(nowMonth > 11) {
		nowYear++;
		nowMonth = 0;
	}
	refreshDate();
    markDateWhenCheck();
})


// Add mark into calender from list
function markDateWhenLoad() {
    // get month & day from list
    let divTodoes = [];
    let divTodos = document.querySelectorAll("div.todo");
    //nodelist to array
    for (divTodo of divTodos) {
        let k = 0;
        if (k < divTodos.length) { 
            divTodoes.push(divTodo);
            k++;  
        }
    }

    for(let i = 0; i < divTodoes.length; i++) {
        let markYear = divTodoes[i].children[1].innerHTML.split(" ",5)[0];
        let markMonth = divTodoes[i].children[1].innerHTML.split(" ",5)[2];
        let markDay = divTodoes[i].children[1].innerHTML.split(" ",5)[4];
        let findMonth = (monthName[Number(markMonth)-1]);

        let dayInCalender = document.getElementById("date");
            if ((findMonth == month.innerHTML) && (markYear == year.innerHTML)) {
                for(let j = 0; j < 50; j++) {
                    if (dayInCalender.children[j]) {
                        if ( dayInCalender.children[j].innerHTML == markDay ) {
                            dayInCalender.children[j].classList.toggle("mark");
                        } 
                    } 
                }
            } 
    }
}


function markDateWhenCheck() {
      // get month & day from list
      let divTodoes = [];
      let divTodos = document.querySelectorAll("div.todo");
      // nodelist to array
      for (divTodo of divTodos) {
          let k = 0;
          if (k < divTodos.length) { 
              divTodoes.push(divTodo);
              k++;  
          }
      }
  
      for(let i = 0; i < divTodoes.length; i++) {
          let markYear = divTodoes[i].children[1].innerHTML.split(" ",5)[0];
          let markMonth = divTodoes[i].children[1].innerHTML.split(" ",5)[2];
          let markDay = divTodoes[i].children[1].innerHTML.split(" ",5)[4];
          let findMonth = (monthName[Number(markMonth)-1]);
  
          let dayInCalender = document.getElementById("date");
              if ((findMonth == month.innerHTML) && (markYear == year.innerHTML)) {
                  for(let j = 0; j < 50; j++) {
                      if (dayInCalender.children[j]) {
                          if ( dayInCalender.children[j].innerHTML == markDay ) {
                              if (dayInCalender.children[j].classList.contains("mark")) {
                                continue;
                              } else {
                                dayInCalender.children[j].classList.add("mark");
                              }
                          } 
                      } 
                  }
              } 
      }
}



function markDateWhenTrash(todoItem) {
      // delete
      let todoItemYear = todoItem.children[1].innerHTML.split(" ",5)[0];
      let todoItemMonth = todoItem.children[1].innerHTML.split(" ",5)[2];
      let todoItemDay = todoItem.children[1].innerHTML.split(" ",5)[4];
      let findTodoItemMonth = (monthName[Number(todoItemMonth)-1]);
      let dayInCalender = document.getElementById("date");
      if ( (findTodoItemMonth == month.innerHTML) && (todoItemYear == year.innerHTML)) {
        for(let i = 0; i < 50; i++) {
            if (dayInCalender.children[i]) {
                if ( dayInCalender.children[i].innerHTML == todoItemDay ) {
                        dayInCalender.children[i].classList.toggle("mark");
                }
            } 
        } 
      }
}



//------------------------------------------------------------------
// To Do List Section
let section = document.querySelector("section");
let add = document.querySelector("form button");

// add into list
add.addEventListener("click", e => {
    // prevent form form being submitted
    e.preventDefault();


    //get the input values
    let form = e.target.parentElement;
    let todoText = form.children[0].value;
    let todoMonth = form.children[1].value;
    let todoDay = form.children[2].value;
    let todoYear = form.children[3].value;


    // restriction of M, D, Y typing 
    if (todoText == "" || todoMonth == "" || todoDay == "") { 
        alert("Please enter correct information");
        return;
    }

    if (todoMonth > 12 || todoMonth < 0 || todoDay < 0 || todoDay > 31) {
        alert("Please enter correct date.");
        return;
    }  


    // create an todo 
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = todoText;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = todoYear + " / " + todoMonth +  " / " + todoDay;
    todo.appendChild(text);
    todo.appendChild(time);


    // create check & trash button
    let completeButton = document.createElement("button")
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';

    completeButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");

        let divClass = e.target.parentElement.className.split(" ", 2);
        myTodo.divClass = divClass;
    })

    let trashButton = document.createElement("button")
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';

    trashButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        markDateWhenTrash(todoItem);
        todoItem.addEventListener("animationend", () => {

            // remove from local storage
            let text = todoItem.children[0].innerText;
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((item, index) => {
                if (item.todoText == text) {
                    myListArray.splice(index, 1);
                    localStorage.setItem("list", JSON.stringify(myListArray));
                }
            })
            // div remove
            todoItem.remove();
            markDateWhenCheck();
        })
        todoItem.style.animation = "scaleDown 0.3s forwards";

    })

    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    todo.style.animation = "scaleUp 0.3s forwards";

    // create objects
    let myTodo = {
        todoText: todoText,
        todoMonth: todoMonth,
        todoDay: todoDay,
        todoYear: todoYear
    };

    // store data into array of objects
    let myList = localStorage.getItem("list");
    if (myList == null) {
        localStorage.setItem("list", JSON.stringify([myTodo]))
    } else {
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArray));
    };
   
    //Clear text input
    form.children[0].value = "";
    form.children[1].value = "";  
    form.children[2].value = "";  
    section.appendChild(todo);

    markDateWhenCheck();
})

// first run
loadData();


function loadData() {
    let myList = localStorage.getItem("list");
    if (myList !== null) {
        let myListArray = JSON.parse(myList);
        myListArray.forEach(item => {
            
            //create a todo
            let todo = document.createElement("div");
            todo.classList.add("todo");
            let text = document.createElement("p");
            text.classList.add("todo-text");
            text.innerText = item.todoText;
            let time = document.createElement("p");
            time.classList.add("todo-time");
            time.innerText = item.todoYear + " / " + item.todoMonth +  " / " + item.todoDay;
            todo.appendChild(text);
            todo.appendChild(time);

            // create check & trash button
            let completeButton = document.createElement("button")
            completeButton.classList.add("complete");
            completeButton.innerHTML = '<i class="fas fa-check"></i>';

            completeButton.addEventListener("click", e => {
                let todoItem = e.target.parentElement;
                todoItem.classList.toggle("done");
                let div = document.querySelector("section.toDoList div");
                let divClass = div.className.split(" ",2);
                localStorage.setItem("divClass", JSON.stringify(divClass));
            })

            let trashButton = document.createElement("button")
            trashButton.classList.add("trash");
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';

            trashButton.addEventListener("click", e => {
                let todoItem = e.target.parentElement;
                markDateWhenTrash(todoItem);

                todoItem.addEventListener("animationend", () => {
                    
                    // remove from local storage
                    let text = todoItem.children[0].innerText;
                    let myListArray = JSON.parse(localStorage.getItem("list"));
                    myListArray.forEach((item, index) => {
                        if (item.todoText == text) {
                            myListArray.splice(index, 1);
                            localStorage.setItem("list", JSON.stringify(myListArray));
                        }
                    })
                    
                    // div remove
                    todoItem.remove();
                    markDateWhenCheck();
                    
                })
                todoItem.style.animation = "scaleDown 0.3s forwards";
                
                
            })

            todo.appendChild(completeButton);
            todo.appendChild(trashButton);

            todo.style.animation = "scaleUp 0.3s forwards";

            section.appendChild(todo);

            
        })
    }
    markDateWhenLoad();
}