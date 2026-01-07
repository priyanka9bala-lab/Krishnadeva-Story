import ChoiceButton from '../ChoiceButton'

export default function ChoiceButtonExample() {
  return (
    <div className="p-8 space-y-4 bg-background">
      <ChoiceButton
        text="Act with wisdom: Send a firm demand to Adil Shah"
        onClick={() => console.log('Wisdom choice selected')}
        variant="default"
      />
      <ChoiceButton
        text="Launch a surprise attack on Raichur!"
        onClick={() => console.log('Attack choice selected')}
        variant="primary"
      />
    </div>
  )
}
