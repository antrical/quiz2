document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("btn").addEventListener("click", function () {
       



        fetch('https://quizapi.io/api/v1/questions?apiKey=Ol8s0X2iWFe8w6p1L7Nckl9qM99YVH1mab9gjH3E&category=code&limit=10&tags=JavaScript')
            .then(response => response.json())
            .then(data => {
                let quizIndex = new quizQuestion(data); // nytt objekt
                quizIndex.printQuestion() // lägga in i egen funktion 
                quizIndex.submit()

            });


        class quizQuestion {
            constructor(data) {
                console.log("data: ");
                // console.log(data);
            
                this.questionObjects = data; //Hela questonojketet i en lista
                console.log("this.questionObjects");
                console.log(this.questionObjects);

            }


            printQuestion() {
                for (let i = 0; i < this.questionObjects.length; i++) {  // loopar igenom antalet frågor i question objects listan i class quizQuestion
                    let questionObject = this.questionObjects[i] // 
                    //console.log("--------------------- ");
                    // console.log(questionObject);
                    let P = document.createElement('p')
                    P.append(questionObject.question)

                    // console.log(question)
                    document.getElementById("bd").append(P)  //lägger in mina svar i diven (P)

                    // let answers = this.answer_arr[i];
                    //console.log(answers);//här får jag mina svar under frågan 


                    // console.log("Question: " + questionObject.question)
                    for (const answer in questionObject.answers) { //answer = key
                        let xNull = questionObject.answers[answer];
                        if (xNull !== null) {


                           // (questionObject.answers.hasOwnProperty(answer))
                            const answerValue = questionObject.answers[answer];
                            // console.log("answer: " + answerValue);
                            let tr = document.createElement('tr');

                            bd.append(tr)

                            let checkB = document.createElement('INPUT');
                            checkB.setAttribute('type', 'checkbox');

                            tr.append(checkB)
                            tr.append(answerValue)

                            let questionId = answer;
                            console.log(questionId);

                            checkB.id = answer; // sätter id för att kunna sortera mina checkboxes
                            //checkB.value = answer;



                        }

                

                    }

                 
                }

            }

            submit () {
                let currentQuestionArr = []; //min stora array som tar in true, false 
                let inputArray = []; //hit pushar jag mina 10 st array med true, false svar
                let inputAnswer = document.querySelectorAll('input[type="checkbox"]'); //LISTA
                for (let i = 0; i < inputAnswer.length; i++) { 
                    if (i == inputAnswer.length-1){ // problemet innan fick endast 9 array av 10 (fullösning)
                        currentQuestionArr.push(inputAnswer[i].checked) 
                        inputArray.push(currentQuestionArr)
                    }
                   else if (inputAnswer[i].id === "answer_a") { // varje gång det blir answer_a ska det tömmas och börja på nästa 
                        if (currentQuestionArr.length > 0 ){ 
                            inputArray.push(currentQuestionArr)
                            currentQuestionArr = [] //Pusha in både true och false i tomma arrayen
                       }
                        currentQuestionArr.push(inputAnswer[i].checked)

                    }
                    else {
                        currentQuestionArr.push(inputAnswer[i].checked)

                    
                    }
                    

                   ////////TO DO
                    // Koppla min submit till en knapp, checka om ikryssad checkbox blir true
                    // Checka min lista inputArray mot en annan lista som har correct_answers 

                }


                  console.log(inputArray);
            
            }


        }

       

    }



    );// end of DOM event



});

