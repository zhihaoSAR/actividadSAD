function a()
{
    return new Promise((resolve, reject) => {
        setTimeout(()=> {return 5}, 2000)
    })
}
a().then(console.log)