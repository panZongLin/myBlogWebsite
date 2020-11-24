import { Button, Result } from 'antd';
import React from 'react';
import { history, FormattedMessage } from 'umi';

const NoFoundPage: React.FC<{}> = () => (
	<Result
		status="404"
		title="404"
		subTitle={<FormattedMessage id="app.404.subTitle" />}
		extra={
			<Button type="primary" onClick={() => history.push('/')}>
				<FormattedMessage id="app.404.extra" />
			</Button>
		}
	/>
);

export default NoFoundPage;
