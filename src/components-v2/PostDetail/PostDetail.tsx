import {TNode} from '@udecode/plate';

import React, {useState} from 'react';
import {FacebookProvider, EmbeddedPost} from 'react-facebook';
import ReactMarkdown from 'react-markdown';

import Link from 'next/link';
import {useRouter} from 'next/router';

import {Typography} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import LinkifyComponent from '../../components/common/Linkify.component';
import ShowIf from '../../components/common/show-if.component';
import {Post} from '../../interfaces/post';
import {PostRender} from '../PostEditor/PostRender';
import {formatStringToNode} from '../PostEditor/formatter';
import {Button, ButtonVariant, ButtonColor, ButtonSize} from '../atoms/Button';
import {Gallery} from '../atoms/Gallery';
import {NSFW} from '../atoms/NSFW/NSFW.component';
import {PostActionComponent} from '../atoms/PostAction';
import {HeaderComponent} from '../atoms/PostHeader';
import {ReadMore} from '../atoms/ReadMore/ReadMore';
import {TabsComponent} from '../atoms/Tabs';
import {Video} from '../atoms/Video';
import {useStyles} from './PostDetail.styles';
import {useCommentTabs, CommentTabs} from './hooks/use-comment-tabs';

import remarkGFM from 'remark-gfm';
import remarkHTML from 'remark-html';
import {v4 as uuid} from 'uuid';

type PostDetailListProps = {
  post: Post;
  anonymous: boolean;
  onUpvote: (reference: Post | Comment) => void;
  onSendTip: (post: Post) => void;
};

export const PostDetail: React.FC<PostDetailListProps> = props => {
  const styles = useStyles();
  const router = useRouter();

  const {post, onUpvote, onSendTip} = props;
  const tabs = useCommentTabs(post);
  const [activeTab, setActiveTab] = useState<CommentTabs>('discussion');
  const [shoWcomment, setShowComment] = useState(false);
  const [, setDownvoting] = useState(false);
  const [viewContent, setViewContent] = useState(!post.isNSFW);

  const onHashtagClicked = async (hashtag: string) => {
    await router.push(`/home?tag=${hashtag.replace('#', '')}&type=trending`, undefined, {
      shallow: true,
    });
  };

  const handleUpvote = async () => {
    onUpvote(post);
  };

  const handleDownVote = async () => {
    setDownvoting(true);
    setShowComment(true);
    setActiveTab('debate');
  };

  const handleChangeTab = (tab: string) => {
    setActiveTab(tab as CommentTabs);
  };

  const handleViewContent = () => {
    setViewContent(true);
  };

  const toggleShowComments = () => {
    setShowComment(prev => !prev);
    setDownvoting(false);
  };

  const handleSendTip = () => {
    onSendTip(post);
  };

  const getText = (): TNode[] => {
    try {
      const nodes = JSON.parse(post.text) as TNode[];

      if (Array.isArray(nodes)) {
        return nodes;
      } else {
        return [formatStringToNode(post.text)];
      }
    } catch (e) {
      return [formatStringToNode(post.text)];
    }
  };

  return (
    <Paper square className={styles.root}>
      <HeaderComponent post={post} />

      <div className={styles.content}>
        <ShowIf condition={!viewContent}>
          <NSFW viewContent={handleViewContent} />
        </ShowIf>

        <ShowIf condition={viewContent}>
          <ShowIf condition={post.platform === 'myriad'}>
            <Typography variant="body1" color="textPrimary" component="p">
              <PostRender nodes={getText()} />
              <ReadMore text={''} maxCharacter={250} />
            </Typography>

            <div className={styles.tags}>
              {post.tags.map(tag => (
                <div style={{marginRight: 4, display: 'inline-block'}} key={uuid()}>
                  <Link href={`?tag=${tag}&type=trending`} shallow={true}>
                    <a href={`?tag=${tag}&type=trending`}>#{tag}</a>
                  </Link>
                </div>
              ))}
            </div>
          </ShowIf>

          <ShowIf condition={['twitter'].includes(post.platform)}>
            <LinkifyComponent
              text={post.text}
              handleClick={onHashtagClicked}
              variant="body1"
              color="textPrimary"
            />
          </ShowIf>

          <ShowIf condition={['reddit'].includes(post.platform)}>
            {post.title && (
              <LinkifyComponent
                text={post.title}
                handleClick={onHashtagClicked}
                variant="h4"
                color="textPrimary"
              />
            )}

            <ReactMarkdown skipHtml remarkPlugins={[remarkGFM, remarkHTML]}>
              {post.text}
            </ReactMarkdown>
          </ShowIf>

          <ShowIf condition={post.platform === 'facebook'}>
            <FacebookProvider appId={'1349208398779551'}>
              <EmbeddedPost href={post.url} width="700" />
            </FacebookProvider>
          </ShowIf>

          {post.asset?.images && post.asset?.images.length > 0 && (
            <Gallery images={post.asset?.images} onImageClick={console.log} cloudName="dsget80gs" />
          )}

          {post.asset?.videos && post.asset.videos.length > 0 && (
            <Video url={post.asset.videos[0]} />
          )}
        </ShowIf>
      </div>

      <div className={styles.action}>
        <PostActionComponent
          metrics={post.metric}
          upvoted={post.isUpvoted}
          downvoted={post.isDownVoted}
          onUpvote={handleUpvote}
          onDownVote={handleDownVote}
          onShowComments={toggleShowComments}
        />

        <Button
          onClick={handleSendTip}
          variant={ButtonVariant.OUTLINED}
          color={ButtonColor.SECONDARY}
          size={ButtonSize.SMALL}
          className={styles.sendTips}>
          Send Tip
        </Button>
      </div>

      <ShowIf condition={shoWcomment}>
        <TabsComponent tabs={tabs} active={activeTab} onChangeTab={handleChangeTab} />
      </ShowIf>
    </Paper>
  );
};
