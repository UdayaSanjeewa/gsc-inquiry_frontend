import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ChannelContext from "../../../../context/channelContext";

const UserChannelsDialog = ({ user }) => { 
  const { channels, getAllChannels, working } = useContext(ChannelContext);
  const [filteredChannels, setFilteredChannels] = useState([]);

  console.log("CHANNELS : ", channels);
  
  const userChannels = user?.public_metadata.channel;
  console.log("USER CHANNELS : ", userChannels);
  console.log("FILTERED CHANNELS : ", filteredChannels);
  
  

  // Fetch channels when the component mounts
  useEffect(() => {
    getAllChannels();
  }, [working]);

  // Filter channels based on user public metadata
  useEffect(() => {
    if (user?.public_metadata?.channel) {
      // Assuming user.public_metadata.channel contains an array of channel IDs
      const userChannelIds = user.public_metadata.channel; // This could be an array of IDs or names
      console.log("CHANNEL IDS : ", userChannelIds);
      
      const filtered = channels.filter((channel) =>
        userChannelIds.includes(channel.id) // Assuming `channel.id` exists
      );
      setFilteredChannels(filtered);
    }
  }, [channels, user]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View Channels
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Channels</DialogTitle>
        </DialogHeader>
        <h1>User Id: {user.id}</h1>
        <h2>Channels:</h2>
        {
          filteredChannels.length > 0 ? (
            filteredChannels.map((item) => (
              <h1 key={item._id}>{item.title}</h1>
            ))
          ) : (
            <p>No channels found for this user.</p>
          )
        }
      </DialogContent>
    </Dialog>
  );
};

export default UserChannelsDialog;
