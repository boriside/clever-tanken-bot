const { Wit, log } = require("node-wit")

const WitClient = new Wit({
  accessToken: "Z2KIGPGGW2NTTR72XFA2GKYZINWNPJ6F",
  logger: new log.Logger(log.DEBUG)
})

exports.fetchTextInfo = function(text) {
 	const result = WitClient.message(text)
	console.log(result)
	return result
}

exports.findMatch = function(result, entities, intent) {

    let foundIntent = false
    console.log(intent)
  if(intent && result.entities && result.entities[intent.name]) {
      for(intent in intent.intents) {
        const foundIndex = result.entities.intent.indexOf(intent.value)
        if(foundIndex != -1) {
          foundIntent = true
        }
      }
  }

  let values = {}
  if(entities && result.entities) {
    for (index in entities) {
      const entity = entities[index]
      const value = result.entities[entity]
      if(value) {
        values[entity] = value
      }
    }
  }

  if((!entities || Object.keys(values).length == entities.length) && (!intent || foundIntent)) { 
    console.log("values")
    console.log(values)
    return values 
  }

  console.log("null")
  return null

}
