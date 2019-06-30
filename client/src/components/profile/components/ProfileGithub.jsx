import React, { Component } from "react";

class ProfileGithub extends Component {
  state = {
    repos: []
  };

  componentDidMount() {
    const { username } = this.props;

    fetch(`https://api.github.com/users/${username}/repos`)
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;

    let repoItems;
    if (repos.length === undefined) {
      repoItems = <span>Github Username Not Found</span>;
    } else {
      if (repos.length === 0) {
        repoItems = <span>You dont have any Repos</span>;
      } else {
        repoItems = repos.map(repo => (
          <div key={repo.id} className='card card-body mb-2'>
            <div className='row'>
              <div className='col-md-6'>
                <h4>
                  <a
                    href={repo.html_url}
                    className='text-dark'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {repo.name}
                  </a>
                </h4>
              </div>
              <div className='col-md-6'>
                <span className='badge badge-info mr-1'>
                  Stars: {repo.stargazers_count}
                </span>
                <span className='badge badge-secondary mr-1'>
                  Watchers: {repo.watchers_count}
                </span>
                <span className='badge badge-success'>
                  Forks: {repo.forks_count}
                </span>
              </div>
            </div>
          </div>
        ));
      }
    }

    return (
      <div ref='myRef'>
        <hr />
        <h3 className='mb-4'>Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

export default ProfileGithub;
