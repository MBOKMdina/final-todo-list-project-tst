export let users = [
    {
        name: 'John Jamason',
        dataId: 1
    },
    {
        name: 'Khumbo',
        dataId: 2
    },
    {
        name: 'Thanda',
        dataId: 3
    },
    {
        name: 'Beverly',
        dataId: 4
    },
    {
        name: 'Makanaka',
        dataId: 5
    }]

    export function check(value)
    {
        let exists = false
        users.forEach((user) => 
        {
            if(user.name === value)
            {
                exists = true;
            }
        });
        return exists;
    }

    export function generateId()
    {
        let maxNo = 0;
        users.forEach((user)=>
        {
            if(user.dataId > maxNo)
            {
                maxNo = user.dataId;
            };  
        });
        let newId = maxNo + 1;
        return newId;
    }