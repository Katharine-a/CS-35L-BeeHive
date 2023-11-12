export default function Post(){
    return(
        <div className="post">
        <div className="image">
            <img src="https://cdn.pixabay.com/photo/2014/04/03/10/29/hexagons-310659_1280.png" alt=""/>
        </div>
        <div className="texts">
         <h2>Beehive honeycomb </h2>
         <p className="info">
          <a className="author">Jane Doe</a>
          <time>11-11-2023 9:10</time>
         </p>
         <p className="summary">New app called beehive for service events</p>
        </div>
      </div>
    );
}