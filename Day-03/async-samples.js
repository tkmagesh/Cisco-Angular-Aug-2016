var pgm = (function(){
	function addSync(x,y){
		console.log('       [Service Provider] processing ', x, ' and ', y);
		var result = x + y;
		console.log('       [Service Provider] returning result');
		return result;
	}
	function addSyncClient(x,y){
		console.log('[Service Consumer] triggering addSync');
		var result = addSync(x,y);
		console.log('[Service Consumer] result = ', result);
	}

	function addAsync(x,y){
		console.log('       [Service Provider] processing ', x, ' and ', y);
		setTimeout(function(){
			var result = x + y;
			console.log('       [Service Provider] returning result');
			return result;
		}, 3000);
	}

	function addAsyncClient(x,y){
		console.log('[Service Consumer] triggering addAsync');
		var result = addAsync(x,y);
		console.log('[Service Consumer] result = ', result);
	}
	return {
		addSyncClient : addSyncClient,
		addAsyncClient : addAsyncClient
	}
})()