/*
August 11-12 until Login form in client side


How to impriment the notifications 
q. use firebase cloud messaging 
q.do that index.js first impriment the notification on like 

.data() digs into the details in firebase which meaans the right place in firebase.

what about in client end ?
do usual react app open delete all the unnessaly thingy and install things 
npm install --save react-router-dom
npm install --save :@material/ul/core or things 
npm install --sv

delete index also 
make pages and components in oages camelcase for components usual casing

import browserrouter as router ,route switvh from dom
{} you use if you dont spexify the last part of the require path
improt everythign 
put navbar outside the switch but inside router 
to use theme provider from material ur core then 
themeprovider and createmuitheme also 
just select and const theme = crateMuiTheme do that.
and inside return import that with parameter from the above
 theme={theme}
<route exat path =' compoment =


in the home.js
for the communication with server side import axios 
npm install --save axios
also for grid styling grid from @material-ui/ore
rce for the shortcut for the snippers react 
to communicate with database use componentDidMount() out inside the class
set the proxy in the json file with out the last /
axios.get("/rest of the path").thenchain the response like
axios.get('/dffdf').then(res=>{
    and set state 
    you always need to setstate when communicating with backend 
    set state as an objevt like
    this.setState({
        screamm:res.data  you need data for axios
        chekc possible error of course

    })
})
inside the render create a variable recentsscreamsmarkoup 
and assign it as this current state like 
let recentScreamsMarkup =this.state.screams
and check in the same line if it exists.
?(
    in order to assign the data depending on the situation inside the render 
    you can start with{ then inside ( gets rendered if the condition meets)}
    so if this state.sceam since it is an array you can use map and of couse set the key bc the react would yell 
    how to render 
    this.state.screams.map(scream => <Scream scream={scream})>
    :otherwise just paragraph loading sign 

    inside return(
        use grid how to use grid?
        first <Grid container jsut some ui thign and 
        use item underneath
        <grid item sm={8} if relativr small xs={if its to samll then 12 to oppiupz all the spaces avaialebl}
        and if you set the first grid 8 then the second must be 4

    )
    inside the componet of sceram whcih takes care of each oost screaming styling first 
    get the props from the home
    inside render before return 
    const { scream:{ frefrf,frfr,ffr,}}= this.props;
    that is a deconstruciton throuigh which you can access to each key of the objects of the props that you are gettting 
    also to format the time relative to the now time ust the dayjs 
    install npm install --save dayjs  and improt at the top and also you need th eplugin called realtive Time 
    inside the render apply the extention in the day js 
    doing dayjs.extend(relativeTime),
;
typography in material ui is not to mess with thefont and thigns and oveall it is a good practice.
card in materila ui 


withStyles you acan export at the end like
export default withStles(styles)(classname)

and you define stlyes outside the class like
const styles={card:{}}
variant does keep the same style
for the navigation use appbar and toolbar inside toolbar button
how about the login apge?
axios from 'axios
 
inside the login use axios but this time since it is a post request you need to 
do the construcer thign how do you do is taht
constructor(){
    super();
    this.state={
        email:'', like taht initialize everything that you need to 
    }
    for post constuctor

    also you need a event hander usually form and submitbutton
    for the button type submit 
    so acutally the submiteventhanderl you can pit in form
    like form onSubmit={this.handleSubmit}
    noVaridate ignores the autochekc form the gogole 
    use textFiled from materila ui 
    thtere is onChange hook the event handelr 
    onChange ={this.handleCHange}
    fullWidth measn the it streches out the whole screen
also for the value set the current state like
value={this.state.password
fist event handleChange eveything should be inside the class so that you hve access to ut

}
handleChange=(event )=>{
    this.setState({
        [event.target.name]:event.target.value,

    })
    for the handleSubmit=(event)=>{
        event.defaultPrevent() to stop the form from submitting it once
        set state
        this.setState({
            loading;true,
        })
        const userData={
            emmail:this.state.email,
            password:this.state.password,
        };
        axios.post('jjfdfj',userdata).then((res)=>{
            what you send with this state axis.post(, and the second data 
                is referring to the req that is written in the server side loin function)
                when you send the pist (fkdpfkdfkd)then the backend works and 
                what you get is just the response after scannign.
                and you do like then((res)=>{
                    something if you need to setstatethen do
                    this.setState({
                        loading:false if not then just console out maybe?
                        and to redirect to the oage or soehtr use t
                        this.props.history.push('fjdfidfdi');

                    })
                })
        })
    }
}
}


)


lets creact the app for the back end first twitter replica.
first work with index.js















*/
