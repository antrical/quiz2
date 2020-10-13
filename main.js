document.addEventListener("DOMContentLoaded", function (e) {
    //När sidan laddas lägger jag en eventlistener på knappen som skapar quizzen vid klick
document.getElementById("btn").addEventListener("click", () => {

    let name = document.getElementById('name');
    name2 = name.value;
    div.append(name2 + " spelar en omgång! ");




    fetch('https://quizapi.io/api/v1/questions?apiKey=Ol8s0X2iWFe8w6p1L7Nckl9qM99YVH1mab9gjH3E&category=code&limit=10&tags=JavaScript')
        .then(response => response.json())
        .then(data => {
            let quizIndex = new quizQuestion(data); // skapa instans av klassen quizQuestion
            quizIndex.printQuestion() // kör metod för att skriva ut frågorna och svarsalternativ 
            quizIndex.correct() //metod för att lägga in facit till quiz i objektet.

        });


    class quizQuestion {
        constructor(data) {
            this.questionObjects = data; //Hela questionobjektet i en lista // här hämtar jag all data som jag behöver 
            this.inputArray = []; //tom array som kommer innehålla 10 st array med true,false från spelarens icheckade checkbox
            this.correct_ans = []; // tom array som kommer innehålla facit till quiz
            this.points = new Points() // 
            this.submitButton(); // För att sbmbutton metoden ska var aktiv så fort konstruktorn körs

            console.log("this.questionObjects");
            console.log(this.questionObjects);
            ;

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

                        //console.log(inputArray);

                    }



                }


            }

        }


        submit() { // Loopar igenom checkbox-elementen och pushar dem till currentQuestionArr 
            console.log("submitbutton klick!!");
            let currentQuestionArr = []; //min stora array som tar in true, false 
            let inputAnswer = document.querySelectorAll('input[type="checkbox"]'); //LISTA
            for (let i = 0; i < inputAnswer.length; i++) {
                if (i == inputAnswer.length - 1) { // problemet innan fick endast 9 array av 10 (ful lösning)
                    currentQuestionArr.push(inputAnswer[i].checked)
                    this.inputArray.push(currentQuestionArr)
                }
                else if (inputAnswer[i].id === "answer_a") { // Varje gång det blir answer_a fortsätter det till en ny fråga
                    if (currentQuestionArr.length > 0) {
                        this.inputArray.push(currentQuestionArr)
                        currentQuestionArr = [] //Pushar in både true och false i tomma arrayen
                    }
                    currentQuestionArr.push(inputAnswer[i].checked)

                }
                else {
                    currentQuestionArr.push(inputAnswer[i].checked)


                }


            }


            //Gör om objekt till array med facit svar

            for (let i = 0; i < this.inputArray.length; i++) {
                this.correct_ans.push((Object.values(this.questionObjects[i].correct_answers)))

            }

            console.log(this.inputArray);

            console.log(this.correct_ans);



        }

        //För att få ut index plats på true på spelarens icheckade svar som är en boolean i en array

        correct() {
            let newInputArray = [];

            for (let i = 0; i < this.inputArray.length; i++) {

                this.inputArray[i].filter((curr_value, index) => {
                    //console.log(curr_value);

                    if (curr_value === true) {
                        newInputArray.push(index);

                    }
                    else
                        console.log("hej");
                }

                )

                //För att få ut index plats på "true" i facit som är en sträng i en array

            }
            let newCorrect_ans = []
            for (let i = 0; i < this.correct_ans.length; i++) {

                this.correct_ans[i].filter((curr_value, index) => {


                    if (curr_value === "true") {
                        newCorrect_ans.push(index);

                    }
                    else
                        console.log("hejdå");
                }

                )
                //För att matcha mina index array och skapar ett objekt av min lilla player.addPoint klass
                if (newInputArray[i] === newCorrect_ans[i]) {
                    this.points.addPoint()

                }



            }

            console.log(this.points);
            console.log(newInputArray);
            console.log(newCorrect_ans);

        }


        // Knappen har fått en eventlyssnare, metoden körs direkt när constructorn körs
        submitButton() {
            let submitButton = document.getElementById("submit");
            submitButton.addEventListener("click", () => {
                this.submit();
                this.correct();
                let score = document.createElement("p");
                score.innerHTML = "Din poäng blev: " + this.points.points + "." + " Inte nöjd? Starta ett nytt spel! "   ;
                div.append(score);
                console.log(this.points.points)
                let newGame = document.getElementById("btnNewGame")
                newGame.addEventListener("click", () => {
                    location.reload();
                }) 

            })
        }


    }



}



);



});






