import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { CyclesContext } from 'contexts/CyclesContext'
import * as zod from 'zod'
import * as S from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'Mínimo de 5 minutos')
    .max(60, 'Máximo de 60 minutos'),
})

type NewCycleFormdata = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormdata>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: { task: '', minutesAmount: 0 },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const isSubmitDisabled = !watch('task')

  function handleCreateNewCycle(data: NewCycleFormdata) {
    createNewCycle(data)
    reset()
  }

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <S.StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </S.StopCountdownButton>
        ) : (
          <S.StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </S.StartCountdownButton>
        )}
      </form>
    </S.HomeContainer>
  )
}
