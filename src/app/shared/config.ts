export class Config {
    public url: string;

    private static _instance: Config = new Config();
    public static get Instance(): Config {
        if (this._instance) {
            this._instance.SetConfig();
        }
        return this._instance;
    }

    SetConfig() {
        this.url = "http://openlibrary.org";
    }
    
}