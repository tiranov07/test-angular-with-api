// класс для работы c наборами ключ-значение
export class Dictionary<T1, T2>{
    private Keys: T1[];
    private Values: T2[];

    constructor() {
        this.Keys = new Array<T1>();
        this.Values = new Array<T2>();
    }

    public AddOrUpdate(key: T1, value: T2) {
        var index = this.Keys.indexOf(key);
        if (index != -1) {
            this.Keys[index] = key;
            this.Values[index] = value;
        }
        else {
            this.Keys.push(key);
            this.Values.push(value);
        }
    }

    public Add(key: T1, value: T2): boolean {
        if (this.Keys.indexOf(key) != -1) {
            return false;
        }
        this.Keys.push(key);
        this.Values.push(value);
        return true;
    }

    public Update(key: T1, value: T2): boolean {
        var index = this.Keys.indexOf(key);
        if (index == -1) {
            return false;
        }
        this.Keys[index] = key;
        this.Values[index] = value;
        return true;
    }

    public DeleteForIndex(index: number) {
        if (this.Keys.length <= index) {
            return;
        }
        this.Keys.splice(index, 1);
        this.Values.splice(index, 1);
    }

    public DeleteForKey(key: T1) {
        var index = this.Keys.indexOf(key);
        if (index == -1) {
            return;
        }
        this.DeleteForIndex(index);
    }

    public GetValueForKey(key: T1): T2 {
        var index = this.Keys.indexOf(key);
        return index == -1 ? undefined : this.Values[index];
    }

    public Foreach(callback: Function) {
        for (let i = 0; i < this.Keys.length; i++) {
            callback.call(null, this.Keys[i], this.Values[i]);
        }
    }
    public Count(): number {
        if (this.Keys != undefined) {
            return this.Keys.length;
        }
        return 0;
    }
}