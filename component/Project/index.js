class Projects extends React.Component {
    content = {
        title: 'My Projects',
        subTitle: 'Recent projects that I have done.',
        repoURL: 'https://github.com/imskrao'
    }

    renderTitle = () => {
        const { title, subTitle } = this.content
        return (<div className="mb-lg-5 mb-4 text-center">
            <h3 className="title-wthree mb-2">{title}</h3>
            <p className="sub-tittle-2 text-white">{subTitle}</p>
        </div>)
    }

    renderDetails = () => {
        const { repoURL } = this.content
        const outerClass = 'd-flex justify-content-center flex-column align-items-center'
        return (<div className="row">
            <div className="col-12">
                <div className={outerClass}>
                    <div className="loader"></div>
                    <p className="sub-tittle-2 text-white mt-4">Projects are loading, Please Wait!</p>
                    <h1 className="text-white my-3">OR</h1>
                    <p className="sub-tittle-2 text-white text-center">Visit my Github Repositories <a href={repoURL} target="_blank">{repoURL}</a> </p>
                </div>
            </div>
        </div>)
    }

    render() {
        return (<div className="container py-xl-5 py-lg-3">
            {this.renderTitle()}
            {this.renderDetails()}
    </div>)
    }
}
ReactDOM.render(
    <Projects />,
    document.querySelector('#projects')
);