Bitacora 						= new Mongo.Collection("bitacora");
Bitacora.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

function wrapCallback(callback, convertResult) {
  if (!callback) {
    return;
  }

  // If no convert function was passed in, just use a "blank function"
  convertResult = convertResult || _.identity;

  return (error, result) => {
    callback(error, ! error && convertResult(result));
  };
}

Mongo.Collection.prototype.insert = function insert(doc, callback) {
  // Make sure we were passed a document to insert
  	
   	
  	

  if(this._name!='bitacora'){
  	var _usuario = null;
  	if (Meteor.isClient) {
        _usuario =Meteor.userId()
    }
  	var doctoBitacora ={
		fecha: new Date(),
		usuario: _usuario,
		accion: 'Crear',
		coleccion: this._name,
		documentoNuevo: doc,
		documentoAnterior: {}
	};
	console.log(doctoBitacora);
  	Bitacora.insert(doctoBitacora);
  }

  if (!doc) {
    throw new Error("insert requires an argument");
  }

  // Shallow-copy the document and possibly generate an ID
  doc = _.extend({}, doc);

  if ('_id' in doc) {
    if (!doc._id || !(typeof doc._id === 'string'
          || doc._id instanceof Mongo.ObjectID)) {
      throw new Error("Meteor requires document _id fields to be non-empty strings or ObjectIDs");
    }
  } else {
    let generateId = true;

    // Don't generate the id if we're the client and the 'outermost' call
    // This optimization saves us passing both the randomSeed and the id
    // Passing both is redundant.
    if (this._isRemoteCollection()) {
      const enclosing = DDP._CurrentInvocation.get();
      if (!enclosing) {
        generateId = false;
      }
    }

    if (generateId) {
      doc._id = this._makeNewID();
    }
  }

  // On inserts, always return the id that we generated; on all other
  // operations, just return the result from the collection.
  var chooseReturnValueFromCollectionResult = function (result) {
    if (doc._id) {
      return doc._id;
    }

    // XXX what is this for??
    // It's some iteraction between the callback to _callMutatorMethod and
    // the return value conversion
    doc._id = result;

    return result;
  };

  const wrappedCallback = wrapCallback(
    callback, chooseReturnValueFromCollectionResult);

  if (this._isRemoteCollection()) {
    const result = this._callMutatorMethod("insert", [doc], wrappedCallback);
    return chooseReturnValueFromCollectionResult(result);
  }

  // it's my collection.  descend into the collection object
  // and propagate any exception.
  try {
    // If the user provided a callback and the collection implements this
    // operation asynchronously, then queryRet will be undefined, and the
    // result will be returned through the callback instead.
    const result = this._collection.insert(doc, wrappedCallback);
    return chooseReturnValueFromCollectionResult(result);
  } catch (e) {
    if (callback) {
      callback(e);
      return null;
    }
    throw e;
  }
}