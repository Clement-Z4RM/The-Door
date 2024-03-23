import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton,
    FacebookShareCount,
    LinkedinIcon,
    LinkedinShareButton,
    RedditIcon,
    RedditShareButton,
    RedditShareCount,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    XIcon,
} from 'react-share'

const SHARE_URL = 'https://the-door.open'
const TITLE = 'The Door - A game of temperature and towns'

export default function Share() {
    return (
        <div className='flex space-x-2 pt-14 justify-center'>
            <div>
                <FacebookShareButton url={SHARE_URL}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>

                <div>
                    <FacebookShareCount url={SHARE_URL}>
                        {count => count}
                    </FacebookShareCount>
                </div>
            </div>

            <div>
                <FacebookMessengerShareButton
                    url={SHARE_URL}
                    appId='521270401588372'
                >
                    <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>
            </div>

            <div>
                <TwitterShareButton
                    url={SHARE_URL}
                    title={TITLE}
                >
                    <XIcon size={32} round />
                </TwitterShareButton>
            </div>

            <div>
                <WhatsappShareButton
                    url={SHARE_URL}
                    title={TITLE}
                    separator=':: '
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
            </div>

            <div>
                <LinkedinShareButton url={SHARE_URL}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
            </div>

            <div>
                <RedditShareButton
                    url={SHARE_URL}
                    title={TITLE}
                    windowWidth={660}
                    windowHeight={460}
                >
                    <RedditIcon size={32} round />
                </RedditShareButton>

                <div>
                    <RedditShareCount url={SHARE_URL} />
                </div>
            </div>

            <div>
                <EmailShareButton
                    url={SHARE_URL}
                    subject={TITLE}
                    body='body'
                >
                    <EmailIcon size={32} round />
                </EmailShareButton>
            </div>
        </div>
    )
}
