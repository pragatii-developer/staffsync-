import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postAnnouncementItem } from '../store/hrmSlice';

const AnnouncementsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { announcements } = useSelector((state) => state.hrm);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Company News');
  const [content, setContent] = useState('');

  const handlePost = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    dispatch(
      postAnnouncementItem({
        title,
        category,
        content,
        targetAudience: 'All',
        pinned: true,
        author: `${user?.name} (${user?.role})`
      })
    );
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <div className="mb-3">
        <h3 className="fw-bold mb-1">Company Announcements & Policy Feed</h3>
        <p className="opacity-75 mb-0">Stay updated with official HR broadcasts, holiday notices, and department events.</p>
      </div>

      <div className="row g-3">
        <div className="col-lg-4">
          <div className="ui-card">
            <h5 className="fw-bold mb-3">Post Official Announcement</h5>
            <form onSubmit={handlePost}>
              <div className="mb-2">
                <label className="small fw-semibold">Headline</label>
                <input className="form-control" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Annual Townhall 2026" />
              </div>
              <div className="mb-2">
                <label className="small fw-semibold">Category</label>
                <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option>Company News</option>
                  <option>Policy Update</option>
                  <option>Holiday</option>
                  <option>Event</option>
                  <option>Urgent</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="small fw-semibold">Announcement Details</label>
                <textarea className="form-control" rows="3" required value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write announcement message..." />
              </div>
              <button type="submit" className="btn-brand w-100">📢 Publish Broadcast</button>
            </form>
          </div>
        </div>

        <div className="col-lg-8">
          {announcements.map((ann) => (
            <div key={ann._id} className="ui-card">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="badge bg-primary">{ann.category}</span>
                <span className="small opacity-75">{ann.date} · Posted by {ann.author}</span>
              </div>
              <h5 className="fw-bold mb-2">{ann.pinned ? '📌 ' : ''}{ann.title}</h5>
              <p className="opacity-85 mb-0">{ann.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
