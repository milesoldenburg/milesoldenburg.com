({
    'appDir' : 'dev',
    'baseUrl' : 'js/lib',
    'dir' : 'prod',
	'generateSourceMaps' : false,
	'inlineText' : true,
    'modules' : [
        {
            'name' : '../main'
        }
    ],
    'optimizeCss' : 'standard',
    'paths' : {
        'bootstrap' : 'bootstrap.min',
        'easing' : 'jquery.easing.1.3',
        'jquery' : 'jquery-1.11.1.min'
    },
    'shim' : {
        'bootstrap' : {
            'deps' : ['jquery']
        },
        'easing' : {
            'deps' : ['jquery']
        }
    },
	'preserveLicenseComments' : false,
	'removeCombined' : true
})
