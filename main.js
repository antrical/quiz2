document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("btn").addEventListener("click", function () {




        fetch('https://quizapi.io/api/v1/questions?apiKey=Ol8s0X2iWFe8w6p1L7Nckl9qM99YVH1mab9gjH3E&category=code&limit=2&tags=JavaScript')
            .then(response => response.json())
            .then(data => {
                let quizIndex = new quizQuestion(data); // nytt objekt
                quizIndex.printQuestion() // lägga in i egen funktion 

            });



        class quizQuestion {
         constructor(data) {
                console.log("data: ");
                // console.log(data);
                // this.category=[];

                this.questionObjects = data; //Hela questonojketet i en lista
                console.log("this.questionObjects");
                console.log(this.questionObjects);


            }


            printQuestion() {
                for (let i = 0; i < this.questionObjects.length; i++) {  // <----------------------------Byt till att loopa igenom antalet frågor i question objects listan
                    let questionObject = this.questionObjects[i] // 
                    console.log("--------------------- ");
                    console.log(questionObject);
                    let P = document.createElement('p')
                    P.append(questionObject.question)

                    // console.log(question)
                    document.getElementById("bd").append(P)  //lägger in mina svar i diven (P)

                    // let answers = this.answer_arr[i];
                    //console.log(answers);//här får jag mina svar under frågan 

                    console.log("Question: " + questionObject.question)
                    for (const answer in questionObject.answers) {
                        if (questionObject.answers.hasOwnProperty(answer)) {
                            const answerValue = questionObject.answers[answer];
                            console.log("answer: " + answerValue);
                            let tr = document.createElement('tr');

                            bd.append(tr)

                            let checkB = document.createElement ('INPUT');
                            checkB.setAttribute('type', 'checkbox');

                            tr.append(checkB)

                            tr.append(answerValue)








                            //TODO Create checkboxes and append to dom
                       /*      let checkB = document.createElement('checkbox');
                            checkB.append(quqestionObject.answers); */
                        }
                    }

                }




            }

        }



    });// end of DOM event



});

