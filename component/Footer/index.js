class Footer extends React.Component {
    render() {
        return (<div>
            <div className="raols-footer-grids py-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 raosocial-icons text-lg-left text-center">
                            <ul>
                                <li>
                                    <a
                                        href="https://github.com/imskrao"
                                        target="_blank"
                                        className="rounded-circle"
                                    >
                                        <i className="fab fa-github"></i>
                                    </a>
                                </li>
                                <li className="px-2">
                                    <a
                                        href="https://www.linkedin.com/in/im-skrao/"
                                        target="_blank"
                                        className="rounded-circle"
                                    >
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://twitter.com/im_skrao"
                                        target="_blank"
                                        className="rounded-circle"
                                    >
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-6 raol-footer text-lg-right text-center">
                            <p className="copy-right-grids">
                                {'copyright © 2020. All Rights Reserved'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}
ReactDOM.render(
    <Footer />,
    document.querySelector('footer')
);