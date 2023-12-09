document.addEventListener('DOMContentLoaded', () => {
    const alertDiv = document.getElementById('alert');
    // Cacher l'alerte 
    alertDiv.style.display = 'none';

    
    const quizForm = document.getElementById('quiz-form');
    quizForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Appeler la fonction pour vérifier les réponses
        checkAnswers();
    });

    // Fonction pour vérifier les réponses
    const checkAnswers = () => {
        // Récupérer toutes les questions
        const questions = document.querySelectorAll('.question-item');

        // Parcourir chaque question
        questions.forEach((question) => {
            const correctAnswer = question.querySelector('.answer-item input[value="true"]');
            const selectedAnswer = question.querySelector('.answer-item input:checked');
            const questionItem = question.closest('.question-item');

            const questionText = questionItem.querySelector('div:first-child');
            const options = questionItem.querySelectorAll('label');

            // Verifier si une réponse a été sélectionnée
            if (selectedAnswer === null) {
                return;
            }

            // Comparer la réponse sélectionnée avec la réponse correcte
            if (selectedAnswer === correctAnswer) {
                questionItem.classList.add('correct');
                questionItem.classList.remove('wrong');
                questionText.style.color = 'green';
                options.forEach((option) => {
                    option.style.color = 'green';
                });

                // Désactiver tous les boutons radio de cette question
                options.forEach((option) => {
                    option.querySelector('input').disabled = true;
                });
            } else {
                questionItem.classList.add('wrong');
                questionItem.classList.remove('correct');
                questionText.style.color = 'red';
                options.forEach((option) => {
                    option.style.color = 'red';
                });
            }
        });

        // Verifier si toutes les reponses sont correctes
        const allCorrect = Array.from(questions).every((question) => {
            const questionText = question.querySelector('div:first-child');
            return questionText.style.color === 'green';
        });

        // Afficher le message 
        if (allCorrect) {
            document.getElementById('alert').style.display = 'block';
            // Ajouter evenement  pour fermer l'alerte
            document.addEventListener('click', closeAlert);
        }
    };

    // Fonction pour fermer l'alerte
    const closeAlert = (event) => {
        // Verifier si l'element cliqué est en dehors de l'alerte
        if (!alertDiv.contains(event.target)) {
            // Cacher l'alerte
            alertDiv.style.display = 'none';
            // Retirer lévénements de clic après avoir caché l'alerte
            document.removeEventListener('click', closeAlert);
        }
    };
});
