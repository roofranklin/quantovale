import { FC } from 'react';
import { AdCardProps} from '../forms/PropertySearchForm/types';
import './style.css';

const AdCard: FC<AdCardProps> = ({ ad }) => {
  return (
    <a href={ad.url} target="_blank" rel="noopener noreferrer" className="ad-card-link">
      <div className="ad-card">
        <img src={ad.thumbnail} alt={ad.subject} className="ad-thumbnail" />
        <div className="ad-info">
          <p className="ad-price">{ad.price}</p>
          <h3 className="ad-title">{ad.subject}</h3>
        </div>
      </div>
    </a>
  );
};

export default AdCard;