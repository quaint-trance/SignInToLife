interface User{
    id: string;
    name: string;
    email: string;
    password: string;
    active: boolean;

    find: (filter:{email?:string, id?:string}) => undefined | User;
    create: (name: string, email: string, password: string)=> false | User;
    update: ( filter:{email?:string, id?: string }, prop: string, value: any  ) => boolean;
    isPasswordCorrect: (password: string)=> boolean;
    linkRide: (rideId: string) => boolean;


}

export default User;