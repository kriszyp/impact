let { P, Div, Span, Label, NumberInput, Variable, all, round } = alkali
christians = new Variable(1000)
population = new Variable(100000)
christianEvangelismRate = new Variable(5)
initialConversions = new Variable(2)
yearsToSimulate = new Variable(1000)

function simulation({christians, population, christianEvangelismRate,}) {
  let deathRate = 1.25
  let totalChristians = christians
  function eachYear() {
    newChristians = christians * christianEvangelismRate / 100 * ((population - christians) / population)
    totalChristians += newChristians
    christians += newChristians - christians * deathRate / 100
  }
  let l = yearsToSimulate.valueOf()
  for (var i = 0; i < l; i++) {
    eachYear()
  }
  return totalChristians
}
netMargin = all([christians, population, christianEvangelismRate, initialConversions]).to(([christians, population, christianEvangelismRate, initialConversions]) => {
  return simulation({
    christians: christians + initialConversions,
    population,
    christianEvangelismRate
  }) -
  simulation({
    christians,
    population,
    christianEvangelismRate
  })
})

document.body.appendChild(new Div([
 P(['This is simulation of the impact of missionaries in conjunction with estimated Christian growth rates, to better compare long-term missionary impacts in different cultures and environments.']),
  Div([
    Label([
      'Current Christian Population:',
      NumberInput(christians)
    ]),  
    Label([
      'Total Population:',
      NumberInput(population)
    ]),
    Label([
      'Christian Growth Rate (% growth per year):',
      NumberInput(christianEvangelismRate)
    ]),  
    Label([
      'Estimated Missionary Direct Conversions:',
      NumberInput(initialConversions)
    ]),
    Div([
      'Net conversions due to marginal missionary impact: ',
      Span(round(netMargin, 0))
    ])
  ])
]))
