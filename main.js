/* 
// string , number , boolean , array , object
// 1. string 
let firstname = "Admiral Yao"

// 2. number
let age = 18
let height = 160

// 3. boolean
let isThai = true

// 5. object
let students = [{
    name : "Rio" ,
    age : 16 ,
    grade : "A"
}, {
    name : "Yuka" ,
    age : 16 ,
    grade : "B"
}]

console.log("My name is ",firstname)
console.log(students) 
*/
//---------------------------------------------------------------------------------------
/*
let score1 = 50
let score2 = 60
let grade = ""

function calGrade(score) {
    if (score>=80){
        grade = "A"
    } else if (score>=70) {
        grade = "B"
    } else if (score>=60) {
        grade = "C"
    } else if (score>=50) {
        grade = "D"
    } else {
        grade = "F"
    }
    return grade
}

let grade1 = calGrade(score1)
let grade2 = calGrade(score2)
console.log("Your grade is ",grade1)
console.log("Your grade is ",grade2) 
*/
//----------------------------------------------------------------------------------------
/*
let score = [10,20,30,40]

for (let index=0 ; index < score.length ; index++) {
    console.log(score[index])
}
*/
//----------------------------------------------------------------------------------------
let students = [{
    name : "Rio" ,
    age : 16 ,
    grade : "A"
}, {
    name : "Yuka" ,
    age : 15 ,
    grade : "B"
}, {
    name : "Noa" ,
    age : 15 ,
    grade : "B"
}]

let student = students.find((s)=>{
    if (s.name == "Yuka"){
        return true
    }
})
console.log("student: ",student)

let highAge = students.filter((s) => {
    if (s.age >=16){
        return true
    }
})
console.log("highAge: ",highAge)

let doubleAge = students.map((s) =>{
    s.age = s.age *2
    return s
})
console.log("doubleAge: ",doubleAge)

