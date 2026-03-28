import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const statuses = ["New", "Contacted", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];

const KanbanBoard = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    API.get('/leads')
      .then(res => setLeads(res.data))
      .catch(err => console.error(err));
  }, []);

  // 👉 This function runs whenever you drop a card
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;

    // Update lead status locally
    const updatedLeads = leads.map(lead =>
      lead._id === draggableId ? { ...lead, status: destination.droppableId } : lead
    );
    setLeads(updatedLeads);

    // Save new status to backend
    API.put(`/leads/${draggableId}`, { status: destination.droppableId })
      .catch(err => console.error(err));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="d-flex flex-wrap justify-content-between">
        {statuses.map(status => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                className="card m-2 shadow-sm"
                style={{ width: '14%' }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="card-header bg-primary text-white text-center">{status}</div>
                <div className="card-body">
                  {leads.filter(lead => lead.status === status).map((lead, index) => (
                    <Draggable key={lead._id} draggableId={lead._id} index={index}>
                      {(provided) => (
                        <div
                          className="card mb-2 p-2 border"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <strong>{lead.name}</strong><br />
                          <small>{lead.company}</small>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
