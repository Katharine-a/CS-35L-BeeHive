import {formatISO9075} from "date-fns";

//title, summary, createdAt, author
//title, summary, cover, content, createdAt, author
export default function Post({title, summary, cover, content, createdAt, author}){
    //{author.username}
    return(
        <div className="post">
        <div className="image">
            <img src={'http://localhost:4000/' + cover} alt=""/>
        </div>
        <div className="texts">
         <h2>hello</h2>
         <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
         </p>
         <p className="summary">today</p>
        </div>
      </div>
    );
}

/*
//this is the code that was there before I (kat) temorarily fixed the author issue
return(
    <div className="post">
    <div className="image">
        <img src="https://cdn.pixabay.com/photo/2014/04/03/10/29/hexagons-310659_1280.png" alt=""/>
    </div>
    <div className="texts">
     <h2>{title}</h2>
     <p className="info">
      <a className="author">{author.username}</a>
      <time>{formatISO9075(new Date(createdAt))}</time>
     </p>
     <p className="summary">{summary}</p>
    </div>
  </div>
);
*/