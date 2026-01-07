import QuizQuestion from '../QuizQuestion'

export default function QuizQuestionExample() {
  return (
    <div className="p-8 min-h-screen bg-background">
      <QuizQuestion
        questionNumber={1}
        totalQuestions={6}
        question="When did the Battle of Raichur happen?"
        options={[
          { id: "a", text: "1520", isCorrect: true },
          { id: "b", text: "1570", isCorrect: false },
          { id: "c", text: "1700", isCorrect: false }
        ]}
        onAnswer={(isCorrect) => console.log('Answer correct:', isCorrect)}
      />
    </div>
  )
}
