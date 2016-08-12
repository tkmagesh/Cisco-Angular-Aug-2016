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

	function addAsync(x,y,onResult){
		console.log('       [Service Provider] processing ', x, ' and ', y);
		setTimeout(function(){
			var result = x + y;
			console.log('       [Service Provider] returning result');
			if (typeof onResult === 'function')
				onResult(result);
		}, 3000);
	}

	function addAsyncClient(x,y){
		console.log('[Service Consumer] triggering addAsync');
		addAsync(x,y, function(result){
			console.log('[Service Consumer] result = ', result);
		});
		
	}

	function addAsyncPromise(x,y){
		console.log('       [Service Provider] processing ', x, ' and ', y);
		var promise = new Promise(function(resolveFn, rejectFn){
				setTimeout(function(){
				var result = x + y;
				console.log('       [Service Provider] returning result');
				resolveFn(result);
			}, 3000);
		});
		return promise;
	}

	function addAsyncPromiseClient(x,y){
		console.log('[Service Consumer] triggering addAsyncPromise');
		var promise = pgm.addAsyncPromise(x,y)
		promise.then(function(result){
		   console.log('[Service Consumer] result = ', result);
		});
	}

	return {
		addSyncClient : addSyncClient,
		addAsyncClient : addAsyncClient,
		addAsyncPromise : addAsyncPromise,
		addAsyncPromiseClient : addAsyncPromiseClient
	}
})()