import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { CyclesContext } from 'contexts/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              const startDate = formatDistanceToNow(cycle.startDate, {
                addSuffix: true,
                locale: ptBR,
              })

              let color: 'yellow' | 'green' | 'red' = 'yellow'
              let content = 'Em andamento'

              if (cycle.finishedDate) {
                color = 'green'
                content = 'Concluído'
              }

              if (cycle.interruptedDate) {
                color = 'red'
                content = 'Interrompido'
              }

              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>{startDate}</td>
                  <td>
                    <Status statusColor={color}>{content}</Status>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
