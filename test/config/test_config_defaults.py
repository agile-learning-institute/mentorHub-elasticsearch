import unittest
from src.config.config import config

class TestConfigDefaults(unittest.TestCase):

    def setUp(self):
        """Re-initialize the config for each test."""
        config.initialize()

    def test_default_properties(self):
        """Test that all default configuration values are initialized correctly."""
        self.assertEqual(config.ELASTIC_CONNECTION_STRING, "http://localhost:9200")
        self.assertEqual(config.KAFKA_CONNECT_URL, "http://localhost:8083")
        self.assertEqual(config.MONGODB_URI, "mongodb://root:example@mentorhub-mongodb:27017")
        self.assertEqual(config.MONGO_DATABASE, "mentorHub")
        
        # Test that the MongoDB collections are correctly parsed into a list
        expected_collections = [
            "curriculum", "encounters", "partners", "paths", "people", "plans", 
            "ratings", "reviews", "topics"
        ]
        self.assertEqual(config.MONGO_COLLECTIONS, expected_collections)

        self.assertEqual(config.KAFKA_TOPIC_PREFIX, "mongo.")
        self.assertEqual(config.MONGODB_SOURCE_CONNECTOR, "mongodb-source-connector")
        self.assertEqual(config.ELASTICSEARCH_SINK_CONNECTOR, "elasticsearch-sink-connector")
        self.assertEqual(config.ELASTICSEARCH_INDEX, "mentorhub-search")
        self.assertEqual(config.REQUEST_TIMEOUT, 30)
        self.assertEqual(config.MAX_RETRIES, 5)
        self.assertEqual(config.RETRY_DELAY, 3)

    def test_to_dict(self):
        """Test the to_dict method of the Config class."""
        expected_dict = {
            "version": config.version,
            "config_items": config.config_items  # Verify the config_items list
        }

        # Convert the config object to a dictionary
        result_dict = config.to_dict()

        # Check that the version and config_items match
        self.assertEqual(result_dict["version"], expected_dict["version"])
        self.assertEqual(result_dict["config_items"], expected_dict["config_items"])

    def test_default_config_items(self):
        """Test the default values of individual configuration items."""
        self._test_config_default_value("ELASTIC_CONNECTION_STRING", "secret")
        self._test_config_default_value("KAFKA_CONNECT_URL", "secret")
        self._test_config_default_value("MONGODB_URI", "secret")
        self._test_config_default_value("MONGO_DATABASE", "mentorHub")
        self._test_config_default_value("MONGO_COLLECTIONS", "curriculum,encounters,partners,paths,people,plans,ratings,reviews,topics")
        self._test_config_default_value("KAFKA_TOPIC_PREFIX", "mongo.")
        self._test_config_default_value("MONGODB_SOURCE_CONNECTOR", "mongodb-source-connector")
        self._test_config_default_value("ELASTICSEARCH_SINK_CONNECTOR", "elasticsearch-sink-connector")
        self._test_config_default_value("ELASTICSEARCH_INDEX", "mentorhub-search")
        self._test_config_default_value("REQUEST_TIMEOUT", 30)
        self._test_config_default_value("MAX_RETRIES", 5)
        self._test_config_default_value("RETRY_DELAY", 3)

    def _test_config_default_value(self, config_name, expected_value):
        """Helper function to check default values of config items."""
        items = config.config_items
        item = next((i for i in items if i['name'] == config_name), None)
        self.assertIsNotNone(item)
        self.assertEqual(item['name'], config_name)
        self.assertEqual(item['from'], "default")
        self.assertEqual(item['value'], expected_value)

if __name__ == '__main__':
    unittest.main()