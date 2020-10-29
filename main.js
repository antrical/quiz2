document.addEventListener("DOMContentLoaded", function (e) {
    //När sidan laddas lägger jag en eventlistener på knappen som skapar quizzen vid klick
    document.getElementById("btn").addEventListener("click", () => {

        let name = document.getElementById('name').value;

       
        fetch('https://quizapi.io/api/v1/questions?apiKey=Ol8s0X2iWFe8w6p1L7Nckl9qM99YVH1mab9gjH3E&category=code&limit=10&tags=JavaScript')
            .then(response => response.json())
            .then(data => {
                let quizIndex = new QuizQuestion(data, name); // skapa instans av klassen quizQuestion
                quizIndex.printQuestion() // kör metod för att skriva ut frågorna och svarsalternativ 
                quizIndex.correct() //metod för att lägga in facit till quiz i objektet.

            });


    }



    );



});






