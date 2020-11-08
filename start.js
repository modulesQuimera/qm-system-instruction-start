module.exports = function(RED) {

	function startNode(config) {
		RED.nodes.createNode(this,config);
        this.start_skip = config.start_skip;
        this.stop_return = config.stop_return;
        this.level_detect = config.level_detect;
        this.type_detect = config.type_detect;
        
		var node = this;
		
		node.on('input', function(msg) {
			var globalContext = node.context().global;
            var file = globalContext.get("exportFile");

            var command = {
                action: "start",
                payload: {
                    attributes: [],
                    callbacks: [],
                    slots: [],
                    leds: []
                }
            };
            
            command.payload.attributes.push({ name: "level_detect", value: node.level_detect });
            command.payload.attributes.push({ name: "type_detect", value: node.type_detect });

            for(callback in config.callbacks){
                command.payload.callbacks.push(config.callbacks[callback]);
            }

            for(slot in config.slots){
                command.payload.slots.push(config.slots[slot]);
            }
            
            for(led in config.leds){
                command.payload.leds.push(config.leds[led]);
            }

            file.instructions.push(command);
            
			globalContext.set("exportFile", file);
			console.log(command);
			node.send(msg);
		});
	}
	RED.nodes.registerType("start", startNode);
}