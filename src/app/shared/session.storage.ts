export class SessionStorage<T> {
	private _sessionStorage:T;
	private _sessionStorageName:string;
	private _tCreator:new () => T;

	constructor(TCreator: new () => T){
		this._sessionStorageName = TCreator.name;
		this._tCreator = TCreator;
		this._sessionStorage = new this._tCreator();
		this.getSession();
	}

	private getSession(){
		let getSessionStorage = sessionStorage.getItem(this._sessionStorageName);
		if(getSessionStorage){
			let json = JSON.parse(getSessionStorage);
			this._sessionStorage = Object.assign(this._sessionStorage,json);
		}
	}

	public GetValue(key:string){
		this.getSession();
		return this._sessionStorage[key];
	}

	public GetAllValue(){
		this.getSession();
		return this._sessionStorage;
	}

	public SetValue(object:T){
		this.getSession();
		for(let key in object){
			if(this._sessionStorage.hasOwnProperty(key))
				this._sessionStorage[key] = object[key]
		}
		// this._sessionStorage = Object.assign(this._sessionStorage,object);
		sessionStorage.setItem(this._sessionStorageName, JSON.stringify(this._sessionStorage));
	}

	public RemoveSession(){
		sessionStorage.removeItem(this._sessionStorageName)
		this._sessionStorage = new this._tCreator();
	}

	public ResetSession(){
		this._sessionStorage = new this._tCreator();
		sessionStorage.setItem(this._sessionStorageName, JSON.stringify(this._sessionStorage));
	}

}
