import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeroImage from '../../img/hero-img.svg';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<Fragment>
			<section className="hero">
				<div className="landing">
					<div className="landing-content">
						<h1 className="x-large">DevBook</h1>
						<p>
							Create a developer profile, share posts and get help
							from other developers
						</p>
						<Link className="btn btn-primary" to="/login">
							Get Started
						</Link>
					</div>
					<div className="leading-img">
						<img src={HeroImage} alt="" />
					</div>
				</div>
			</section>

			<section className="block container">
				<h1>How to get started</h1>

				<p>
					<strong>1 </strong>
					Customize your profile. Click your profile image in the top
					right corner, then select the gear icon to make your profile
					uniquely yours.
				</p>
				<p>
					<strong>2 </strong>
					Explore fellow developers and posts.
				</p>
				<p>
					<strong>3 </strong>
					Like the posts you like to share the love and start getting
					to know the community.
				</p>
				<p>
					<strong>4 </strong>
					Reply to a question in an existing thread or ask a question
					by creating a new topic
				</p>
			</section>

			<section className="container">
				<h1 className="large">What is DevBook?</h1>

				<p>
					DevBook is a community for growing developers.
				</p>

			</section>
		</Fragment>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
