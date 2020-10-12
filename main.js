document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("btn").addEventListener("click", function () {

        let name = document.getElementById('name');
        name2 = name.value;
        div.append(name2 + " spelar en omgång!");




        fetch('https://quizapi.io/api/v1/questions?apiKey=Ol8s0X2iWFe8w6p1L7Nckl9qM99YVH1mab9gjH3E&category=code&limit=10&tags=JavaScript')
            .then(response => response.json())
            .then(data => {
                let quizIndex = new quizQuestion(data); // nytt objekt
                quizIndex.printQuestion() // lägga in i egen funktion 
                //quizIndex.submit()

            });


        class quizQuestion {
            constructor(data) {
                this.questionObjects = data; //Hela questonojketet i en lista // här hämtar jag all data som jag behöver 
                this.correct_ans
                this.inputArray
                this.submitButton(); // För att sbmbutton metoden ska var aktiv så fort konstruktorn körs

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
                    document.getElementById("div").append(P)

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

                            div.append(tr)

                            let checkB = document.createElement('INPUT');
                            checkB.setAttribute('type', 'checkbox');

                            tr.append(checkB)
                            tr.append(answerValue)

                            //let questionId = answer;
                            //console.log(questionId);

                            checkB.id = answer; // sätter id för att kunna sortera mina checkboxes
                            //checkB.value = answer;



                        }



                    }


                }

            }


            submit() { // Loopar igenom checkbox-elementen och pushar dem till currentQuestionArr 
                console.log("submitbutton klick!!");
                let currentQuestionArr = []; //min stora array som tar in true, false 
                let inputArray = []; //Skapar arrayen som ska innehålla 10 array
                let correct_ans = [];
                let inputAnswer = document.querySelectorAll('input[type="checkbox"]'); //LISTA
                for (let i = 0; i < inputAnswer.length; i++) {
                    if (i == inputAnswer.length - 1) { // problemet innan fick endast 9 array av 10 (ful lösning)
                        currentQuestionArr.push(inputAnswer[i].checked)
                        inputArray.push(currentQuestionArr)
                    }
                    else if (inputAnswer[i].id === "answer_a") { // Varje gång det blir answer_a fortsätter det till en ny fråga
                        if (currentQuestionArr.length > 0) {
                            inputArray.push(currentQuestionArr)
                            currentQuestionArr = [] //Pushar in både true och false i tomma arrayen
                        }
                        currentQuestionArr.push(inputAnswer[i].checked)

                    }
                    else {
                        currentQuestionArr.push(inputAnswer[i].checked)


                    }


                }


                ////////TO DO
                // Checka min lista inputArray mot correct_anss - rättning 
                //map funktion?
                //starta nytt spel
                
                //nedan körs för att få fram correct_answers --> facit 

                for (let i = 0; i < inputArray.length; i++) {
                    correct_ans.push((Object.values(this.questionObjects[i].correct_answers)))

                }

                console.log(inputArray);

                console.log(correct_ans);




            }
            

            // DENNA METOD KÖRS DIREKT NÄR CONSTRUCTORN KÖRS SÅ ATT
            // KNAPPEN FÅR EN EVENTLYSSNARE DIREKT

            submitButton() {
                let submitButton = document.getElementById("submit");
                submitButton.addEventListener("click", () => {
                    this.submit();
                })
            }

///GÖRA FILTER OCH skapa en poäng klass, ropa på lilla klassen för att ge poäng
// quizIndex.correct_answers för att nå ? 


        }



    }



    );// end of DOM event



});

