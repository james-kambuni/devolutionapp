import React from 'react'

function CaseStudy() {
  return (
    <div className="container-fluid py-4">
        <style
            dangerouslySetInnerHTML={{
            __html:
                "\n\t\t\t\t#mypdf{\n\t\t\t\t\twidth: 100%;\n\t\t\t\t\theight: 1000px;\n\t\t\t\t}\n\t\t\t\t"
            }}
        />
        {/* Bootstrap core CSS */}
        <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
            crossOrigin="anonymous"
        />
        {/* Place your stylesheet here*/}
        <link href="stylesheet.css" rel="stylesheet" type="text/css" />
        <iframe id="mypdf" src="Docs/Concept paper.pdf" frameBorder={0}
        title="Case Study Video" />
    </div>
  )
}

export default CaseStudy
